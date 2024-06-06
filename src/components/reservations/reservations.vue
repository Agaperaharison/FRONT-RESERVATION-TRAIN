<script>
import jsPDF from 'jspdf';
import io from 'socket.io-client';
export default {
    data() {
        return {
            socket: null,
            filter: 'All',
            reservations_lists: [],
            reservations: [],
            date_value: '',
            searchValue: '',
            openModal: false,
            openModal2: false,
            openModal3: false,
            moreInfo: [],

            trips: [],
            trip_id: '',
            cin: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            contry: '',
            postal_code: '',
            seat: 1,
            paid: '',

            id_res: '',
            unpaid: 0,
            paid_update: 0,
        }
    },
    created() {
        this.socket = io('http://localhost:8081');
        this.socket.on('connect_error', error => {
            console.error('Socket.io connection error:', error);
        });
        this.socket.on('haveNotif', players => {
            //this.fireToast(players[0].notification_info.title ,players[0].notification_info.description, 'success', 'ok')
        });
    },
    beforeDestroy() {
        this.socket.close();
    },
    mounted() {
        this.getReservations();
        this.allTrips();
    },
    methods: {
        fireToast(title, message, icon, btn) {
            Toast2.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: btn
            });
        },
        async getReservations() {
            try {
                const response = await axios.get('/reservations/all-reservations', { withCredentials: true, });
                //console.log(response.data.data)
                this.reservations_lists = response.data.data
                this.reservations = response.data.data
            } catch (err) {
                console.log(err.messange)
            }
        },
        formaterNumero(numero) {
            numero = numero.replace(/\D/g, '');
            if (numero.startsWith('0')) {
                numero = numero.slice(1);
                numero = '+261' + numero;
            } else if (!numero.startsWith('+261')) {
                numero = '+261' + numero;
            }
            numero = numero.replace(/(\+\d{3})(\d{2})(\d{2})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5');
            return numero;
        },
        async addReservation() {
            try {
                const response = await axios.post('/reservations/add-reservation', {
                    trip_id: this.trip_id,
                    cin: this.cin, first_name: this.first_name, last_name: this.last_name,
                    phone_number: this.formaterNumero(this.phone_number), address: this.address, contry: this.contry,
                    postal_code: this.postal_code, seat: this.seat, paid: this.paid
                });
                console.log(response.data.data);
                if (response.data.status) {
                    this.getReservations();
                    this.fireToast('Success!', response.data.data.message, 'success', 'ok');
                    this.cin = '';
                    this.first_name = '';
                    this.last_name = '';
                    this.phone_number = '';
                    this.address = '';
                    this.contry = '';
                    this.postal_code = '';
                    this.seat = 1;
                    this.paid = '';
                } else {
                    this.fireToast('ERROR!', response.data.data.message, 'error', 'ok');
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async allTrips() {
            try {
                const response = await axios.get('/trips/get-all-trips', { withCredentials: true, });
                this.trips = response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
        formattedDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
        formattedTime(time) {
            return new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        },
        filterByOption() {
            if (this.filter === 'All') {
                this.reservations = this.reservations_lists
            } else if (this.filter === 'Paid') {
                this.reservations = this.reservations_lists.filter(res => res.unpaid === 0)
            } else {
                this.reservations = this.reservations_lists.filter(res => res.unpaid > 0)
            }
        },
        filterByDate() {
            if (this.filter === 'All') {
                this.reservations = this.reservations_lists.filter(res => this.formattedDate(res.createdAt) === this.formattedDate(this.date_value))
            } else if (this.filter === 'Paid') {
                this.reservations = this.reservations_lists.filter(res => {
                    return this.formattedDate(res.createdAt) === this.formattedDate(this.date_value) && res.unpaid === 0
                })
            } else {
                this.reservations = this.reservations_lists.filter(res => {
                    return this.formattedDate(res.createdAt) === this.formattedDate(this.date_value) && res.unpaid > 0
                })
            }
        },
        search() {
            const search = this.searchValue.toLowerCase();
            const data = this.reservations_lists.filter(res => {
                return res.client[0].last_name.toLowerCase().includes(search) ||
                    res.trip[0].from[0].localisation_city.toLowerCase().includes(search) ||
                    res.trip[0].from[0].localisation_postal_code.includes(search) ||
                    res.trip[0].to[0].localisation_city.includes(search) ||
                    res.trip[0].to[0].localisation_postal_code.includes(search)
            })
            this.reservations = data;
        },
        toggleModal() {
            this.openModal = !this.openModal
        },
        filterMoreInfo(id) {
            this.moreInfo = this.reservations_lists.filter(res => res.id === id);
            this.toggleModal();
            //console.log(this.moreInfo)
        },
        async generatePDF(id) {
            try {
                this.openModal = true
                this.filterMoreInfo(id);
                if (this.moreInfo) {
                    const doc = new jsPDF();
                    const content = `
                        MORE INFORMATION ABOUT THE RESERVATION

                        Reservation N°${this.moreInfo[0].id}
                        - Reservation date: ${this.formattedDate(this.moreInfo[0].createdAt)}
                        - Number of seat reserved: ${this.moreInfo[0].number_of_seats} seats
                        - Paid: ${this.moreInfo[0].paid} Ar
                        - Unpaid: ${this.moreInfo[0].unpaid} Ar
                        - Rates: ${this.moreInfo[0].number_of_seats} place x ${this.moreInfo[0].trip[0].price} Ar
                        - Total fees: ${(this.moreInfo[0].number_of_seats * this.moreInfo[0].trip[0].price)} Ar
                        - Status: ${this.moreInfo[0].unpaid > 0 ? 'unpaid' : 'paid'}

                        Trips
                        - From: ${this.moreInfo[0].trip[0].from[0].localisation_city}
                        - To: ${this.moreInfo[0].trip[0].to[0].localisation_city}
                        - Departure date: ${this.formattedDate(this.moreInfo[0].trip[0].departure_date)}
                        - Departure Time: ${this.moreInfo[0].trip[0].departure_time}

                        Train
                        - Train ID: ${this.moreInfo[0].trip[0].trains[0].train_matricule}
                        - Train design: ${this.moreInfo[0].trip[0].trains[0].design}
                        - Total seats: ${this.moreInfo[0].trip[0].trains[0].siege}

                        Client
                        - Client name : ${this.moreInfo[0].client[0].first_name + ' ' + this.moreInfo[0].client[0].last_name}
                        - Address: ${this.moreInfo[0].client[0].address} ${this.moreInfo[0].client[0].city} ${this.moreInfo[0].client[0].postal_code}
                        - Email: ${this.moreInfo[0].client[0].email} 
                        - Phone: ${this.moreInfo[0].client[0].phone_number}
                        - Sexe: ${this.moreInfo[0].client[0].sexe}
                        - Nationality: ${this.moreInfo[0].client[0].nationality}
                        - date of Birth: ${this.moreInfo[0].client[0].date_of_birth}

                        DEBTS
                        - Values: ${this.moreInfo[0].unpaid} Ar
                    `;
                    doc.text(content, 5, 10);
                    doc.setFontSize(10);
                    doc.setFont('time new roman')
                    doc.save(`reservation_information_${this.moreInfo[0].id}.pdf`);
                }
            } catch (err) {
                console.log(err);
            }
        },
        toogleModal2() {
            this.openModal2 = !this.openModal2
        },
        toogleModal3() {
            this.openModal3 = !this.openModal3
        },
        openModalUpdate(id, unpaid) {
            this.toogleModal3();
            this.id_res = id;
            this.unpaid = unpaid;
        },
        async updateSales() {
            try {
                if (this.paid_update > this.unpaid || this.paid_update < 0) {
                    this.fireToast('WARNING!', 'Veuillez verifier la valeur entrer!', 'warning', 'ok');
                } else {
                    const response = await axios.post('/reservations/update-sale', {
                        paid_update: this.paid_update,
                        unpaid: this.unpaid,
                        id_res: this.id_res
                    });
                    if (response.data.status) {
                        this.getReservations();
                        this.fireToast('Success!', response.data.data.message, 'success', 'ok');
                        this.paid_update = '';
                        this.unpaid = '';
                        this.id_res = '';
                    } else {
                        this.fireToast('ERROR!', response.data.data.message, 'error', 'ok');
                    }
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="container">
            <div class="header">
                <h1>{{ filter ? filter : 'All' }} reservations</h1>
                <div class="filter">
                    <div class="input-search">
                        <input type="search" v-model="searchValue" placeholder="search" @input="search">
                        <i class="ri-search-line"></i>
                    </div>
                    <div class="option">
                        <select v-model="filter" @change="filterByOption">
                            <option value="" disabled selected>Filter</option>
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <i class="ri-equalizer-fill"></i>
                    </div>
                    <div class="date">
                        <input type="date" v-model="date_value" @input="filterByDate">
                    </div>
                </div>
            </div>
            <div class="body">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Date reservation</th>
                            <th>Departure date</th>
                            <th>from</th>
                            <th>to</th>
                            <th>status</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="reservations.length > 0" v-for="reservation in reservations" :key="reservation.id">
                            <td>{{ reservation.id }}</td>
                            <td>{{ reservation.client[0].last_name }}</td>
                            <td><span>{{ formattedDate(reservation.createdAt) }}</span><br> <small>{{
                                formattedTime(reservation.createdAt) }}</small></td>
                            <td><span>{{ formattedDate(reservation.trip[0].departure_date) }}</span><br> <small>{{
                                reservation.trip[0].departure_time }}</small></td>
                            <td>{{ reservation.trip[0].from[0].localisation_city }} {{
                                reservation.trip[0].from[0].localisation_postal_code }}</td>
                            <td>{{ reservation.trip[0].to[0].localisation_city }} {{
                                reservation.trip[0].to[0].localisation_postal_code }}</td>
                            <td><span :class="reservation.unpaid > 0 ? 'unpaid' : 'paid'">{{ reservation.unpaid > 0 ?
                                'unpaid' : 'paid' }}</span></td>
                            <td class="action">
                                <i class="ri-eye-line" @click="filterMoreInfo(reservation.id)"></i>
                                <i class="ri-edit-circle-line"
                                    @click="openModalUpdate(reservation.id, reservation.unpaid)"></i>
                                <i class="ri-download-2-line" @click="generatePDF(reservation.id)"></i>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="8">No reseravtion found!</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="modal" :class="{ open: openModal }" @click="toggleModal">
                <div class="modal-wrapper1" @click="toggleModal">
                    <i class="ri-close-fill" @click="toggleModal"></i>
                    <h2>MORE INFO</h2>
                    <div class="info-client">
                        <div class="avatar-client">
                            <img src="../../assets/imgs/1869679.png" alt="">
                        </div>
                        <div class="name-client">
                            <h3>
                                <span>{{ moreInfo.length > 0 ? moreInfo[0].client[0].first_name : null }} {{
                                    moreInfo.length
                                        > 0 ?
                                        moreInfo[0].client[0].last_name : null }}</span><br>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].email : null }}</small>
                            </h3>
                        </div>
                    </div>
                    <div class="more-info-user">
                        <div class="div">
                            <h3>
                                <span>Habite à : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].city : null }}</small>
                            </h3>
                            <h3>
                                <span>Domicile : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].address : null }}</small>
                            </h3>
                            <h3>
                                <span>phone numbre : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].phone_number : null }}</small>
                            </h3>
                            <!-- <h3>
                                <span>Nationality : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].nationality : null }}</small>
                            </h3>
                            <h3>
                                <span>Sexe : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].sexe : null }}</small>
                            </h3> -->
                        </div>
                        <div class="verify" v-if="moreInfo.length > 0">
                            <h3 class="success">
                                <i class="ri-check-double-line"></i>
                                <small>validated</small>
                            </h3>
                            <!-- <h3
                                :class="{ 'invalide': moreInfo[0].client[0].is_validate === 0, 'validate': moreInfo[0].client[0].is_validate === 1 }">
                                <i
                                    :class="{ 'ri-alert-line': moreInfo[0].client[0].is_validate === 0, 'ri-check-fill': moreInfo[0].client[0].is_validate === 1 }"></i>
                                <small>{{ moreInfo[0].client[0].is_validate === 0 ? 'unvalidate' : 'validate' }}</small>
                            </h3> -->
                        </div>
                    </div>
                    <div class="activity">
                        <div class="div">
                            <i class="ri-calendar-todo-line"></i>
                            <h2>0</h2>
                        </div>
                        <div class="div">
                            <i class="ri-money-euro-circle-line"></i>
                            <h2>{{ moreInfo.length > 0 ? (moreInfo[0].paid).toLocaleString('fr-FR') : null }} Ar</h2>
                        </div>
                        <div class="div">
                            <i class="ri-money-euro-circle-line"></i>
                            <h2>{{ moreInfo.length > 0 ? (moreInfo[0].unpaid).toLocaleString('fr-FR') : null }} Ar</h2>
                        </div>
                    </div>
                    <div class="info-trip">
                        <div class="div">
                            <h3>TRAIN INFO:</h3>
                            <table>
                                <tr>
                                    <th>matricule</th>
                                    <th>design</th>
                                    <th>Seat</th>
                                </tr>
                                <tr>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].trip[0].trains[0].train_matricule : null }}
                                    </td>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].trip[0].trains[0].design : null }}</td>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].trip[0].trains[0].siege : null }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="div">
                            <h3>TRIP INFO:</h3>
                            <table>
                                <tr>
                                    <!-- <th>#</th> -->
                                    <th>date</th>
                                    <th>time</th>
                                    <th>price</th>
                                </tr>
                                <tr>
                                    <!-- <td>{{ moreInfo.length > 0 ? moreInfo[0].trip[0].id : null }}</td> -->
                                    <td>{{ moreInfo.length > 0 ? formattedDate(moreInfo[0].trip[0].departure_date) :
                                        null }} </td>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].trip[0].departure_time : null }}</td>
                                    <td>{{ moreInfo.length > 0 ? (moreInfo[0].trip[0].price).toLocaleString('fr-FR') :
                                        null
                                        }} Ar</td>
                                </tr>
                            </table>
                        </div>
                        <div class="div">
                            <h3>RESERVATION INFO:</h3>
                            <table>
                                <tr>
                                    <th>N°</th>
                                    <th>Seats</th>
                                    <th>Rate</th>
                                    <th>Total</th>
                                </tr>
                                <tr>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].id : null }}</td>
                                    <td>{{ moreInfo.length > 0 ? moreInfo[0].number_of_seats : null }}</td>
                                    <td>{{ moreInfo.length > 0 ? (moreInfo[0].trip[0].price).toLocaleString('fr-FR') :
                                        null }} Ar x {{ moreInfo.length
                                            > 0 ? moreInfo[0].number_of_seats : null }}</td>
                                    <td>{{ moreInfo.length > 0 ? (moreInfo[0].trip[0].price *
                                        moreInfo[0].number_of_seats).toLocaleString('fr-FR') :
                                        null }} Ar</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal" :class="{ open: openModal2 }" @click="toogleModal2">
                <div class="modal-wrapper1 witdh" @click="toogleModal2">
                    <i class="ri-close-fill" @click="toogleModal2"></i>
                    <h2>New reservation</h2>
                    <form action="#">
                        <div class="form-group">
                            <select v-model="trip_id" id="trip_id">
                                <option value="">Select a trip</option>
                                <option v-if="trips.length > 0" v-for="trip in trips" :key="trip.id" :value="trip.id">{{
                                    trip.from[0].localisation_city }} to {{ trip.to[0].localisation_city }}</option>
                                <option v-else>emplty</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="cin">CIN</label>
                            <input type="number" v-model="cin" id="cin" placeholder="cin number">
                        </div>
                        <div class="form-group">
                            <label for="first_name">First name</label>
                            <input type="text" v-model="first_name" id="first_name" placeholder="first name">
                        </div>
                        <div class="form-group">
                            <label for="last_name">Last name</label>
                            <input type="text" v-model="last_name" id="last_name" placeholder="last name">
                        </div>
                        <div class="form-group">
                            <label for="phone_number">Phone number</label>
                            <input type="text" v-model="phone_number" id="phone_number" placeholder="phone number">
                        </div>
                        <div class="form-group">
                            <label for="address">Address domicile</label>
                            <input type="text" v-model="address" id="address" placeholder="Domicile address">
                        </div>
                        <div class="form-groupG">
                            <div class="left">
                                <label for="contry">Contry</label>
                                <input type="text" v-model="contry" id="contry" placeholder="contry">
                            </div>
                            <div class="right">
                                <label for="code">Postal code</label>
                                <input type="number" v-model="postal_code" id="code" placeholder="postale code">
                            </div>
                        </div>
                        <div class="form-groupG">
                            <div class="left">
                                <label for="seat">Seat</label>
                                <input type="number" v-model="seat" id="seat" placeholder="nomber of seat">
                            </div>
                            <div class="right">
                                <label for="paid">Total paid</label>
                                <input type="number" v-model="paid" id="paid" placeholder="total paid">
                            </div>
                        </div>
                        <div class="form-group" id="foot">
                            <button @click.prevent="addReservation">save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="modal" :class="{ open: openModal3 }" @click="toogleModal3">
                <div class="modal-wrapper1 witdh" @click="toogleModal3">
                    <i class="ri-close-fill" @click="toogleModal3"></i>
                    <h2>New reservation</h2>
                    <h3 class="warning" style="text-align:center; font-size:1.3rem;">debs: {{ (unpaid -
                        paid_update).toLocaleString('fr-FR') }} AR</h3>
                    <form action="#">
                        <div class="form-group">
                            <label for="paid_update">Total paid</label>
                            <input type="number" v-model="paid_update" id="paid_update" placeholder="total paid">
                        </div>
                        <div class="form-group" id="foot">
                            <button @click.prevent="updateSales">update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <button class="add" @click="toogleModal2"><i class="ri-add-fill"></i></button>
    </div>
</template>

<style scoped>
#foot {
    margin-bottom: 2rem;
}

.form-group button {
    position: absolute;
    right: 0;
    padding: .6rem 1rem;
    border-radius: 7px;
    font-size: 1.2rem;
    font-weight: 600;
    background: var(--color-info-light);
    color: var(--color-dark);
    cursor: pointer;
    transition: all .3s ease;
}

.dark-theme-variables .form-group button {
    color: black;
}

.form-group button:hover {
    background: var(--color-primary);
    color: #fff;
}

.form-groupG div,
.form-group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
}

.form-groupG {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.form-groupG label,
.form-group label {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-dark);
}

.form-group select,
.form-groupG input,
.form-group input {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-dark);
    background: var(--color-white);
    border: 2px solid var(--color-info-light);
    padding: 10px 1rem;
    border-radius: 8px;
    transition: all .3s ease;
}

#seat,
#code {
    width: 90px;
}

#seat {}

.form-groupG input:focus,
.form-group input:focus {
    border: 2px solid var(--color-primary);
}

.witdh {
    max-width: 400px;
}

.add {
    position: absolute;
    bottom: 3rem;
    right: 3rem;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    font-weight: 500;
    border-radius: 50%;
    cursor: pointer;
    background: var(--color-info-dark);
    color: var(--color-white);
    transition: all .3s ease;
}

.add:hover {
    background: var(--color-primary);
    color: #fff;
}

.info-trip table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.info-trip th {
    background: var(--color-light);
    height: 30px;
}

.info-trip td {
    text-align: center;
    height: 30px;
    font-weight: 600;
    border-bottom: 1px solid var(--color-light);
}

.info-trip .div h3 {
    text-align: left;
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: underline;
    color: var(--color-primary-variant);
}

.info-trip h2 {
    text-decoration: underline;
    color: var(--color-primary);
}

.activity .div:nth-child(1),
.activity .div:nth-child(2) {
    border-right: 1px solid var(--color-light);
}

.activity .div:nth-child(1) i,
.activity .div:nth-child(1) h2 {
    color: var(--color-primary-variant);
}

.activity .div:nth-child(2) i,
.activity .div:nth-child(2) h2 {
    color: var(--color-success);
}

.activity .div:nth-child(3) i,
.activity .div:nth-child(3) h2 {
    color: var(--color-warning);
}

.activity .div i {
    font-size: 1.8rem;
    padding: 8px;
    border-radius: 50%;
    margin-bottom: 10px;
    background: var(--color-light);
}

.activity .div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    justify-content: center;
}

.activity {
    margin-top: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
}

.more-info-user .div h3 span {
    font-size: 1rem;
    color: var(--color-info-dark);
}

.more-info-user .div h3 small {
    font-size: .9rem;
    color: var(--color-dark);
}

.more-info-user .div {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.verify h3 i {
    font-size: 1.8rem;
}

.verify h3 i {
    font-weight: 100;
}

.verify h3.invalide {
    color: var(--color-warning);
}

.verify h3.validate {
    color: var(--color-success);
}

.verify h3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.more-info-user {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto 5rem;
    align-items: center;
}

.info-client {
    display: grid;
    grid-template-columns: 5rem auto;
    gap: 1rem;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--color-light);
}

.name-client h3 span {
    font-size: 1.2rem;
    color: var(--color-dark);
}

.name-client h3 small {
    font-size: 1rem;
    color: var(--color-info-dark);
}

.avatar-client {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

#modal {
    position: absolute;
    display: none;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
}

#modal.open {
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-wrapper1 {
    position: relative;
    background: var(--color-white);
    padding: 2rem;
    width: 500px;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
}

.modal-wrapper1 .ri-close-fill {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-info-dark);
    transition: all .2s ease;
}

.modal-wrapper1 .ri-close-fill:hover {
    color: var(--color-danger);
}

.modal-wrapper1 h2 {
    color: var(--color-dark);
    margin-bottom: 2rem;
}





.date {
    display: inline-block;
    background: var(--color-light);
    border-radius: var(--border-radius-1);
    padding: 0.8rem 1.8rem;
}

.date input[type="date"] {
    background: transparent;
    color: var(--color-dark);
    font-size: 1.1rem;
}

.container .header {
    margin-top: .6rem;
}

.container h1:nth-child(1) {
    font-weight: 600;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header .filter {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}

.input-search {
    position: relative;
    width: 220px;
}

.input-search input {
    width: 220px;
    padding: 8px 3rem 8px 1rem;
    font-size: 1rem;
    font-weight: 600;
    background: var(--color-white);
    color: var(--color-dark);
    border-radius: 7px;
    border: 1px solid var(--color-info-light);
}

.input-search i {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.4rem;
    height: 100%;
    padding: 5px 8px 0;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    background: var(--color-light);
    cursor: pointer;
    color: var(--color-dark);
    border: 1px solid var(--color-info-light);
}

.option {
    position: relative;
    width: 110px;
    height: 35px;
    border: 1px solid var(--color-info-light);
    border-radius: 7px;
}

.option select {
    height: 100%;
    width: 100%;
    cursor: pointer;
    padding: 7px 1rem;
    background: var(--color-white);
    color: var(--color-info-dark);
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 7px;
    z-index: 5;
}

.dark-theme-variables .option select {
    color: var(--color-dark);
}

select option {
    color: var(--color-dark);
}

.option i {
    position: absolute;
    right: .5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    color: var(--color-info-dark);
}

.option i.ri-equalizer-fill {
    font-size: 1.4rem;
}

.option i.ri-arrow-drop-down-line {
    font-size: 2rem;
}

.body {
    width: 100%;
    margin-top: 1rem;
    background: var(--color-white);
    margin-top: 1rem;
    padding: 0 0 1rem;
    padding-bottom: 1rem;
    width: 100%;
    max-height: 88vh;
    border-radius: 10px;
    overflow-y: auto;
    text-align: left;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    position: sticky;
    top: 0;
    background: var(--color-white);
}

thead tr th {
    height: 50px;
    padding-left: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: var(--color-info-dark);
    color: #fff;
}

tbody tr td {
    height: 50px;
    padding-left: 1.1rem;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid var(--color-info-dark);
}

tr:last-child td {
    border-bottom: none;
}

td:nth-child(2) {
    font-weight: bold;
    font-size: 1.1rem;
}

span.paid,
span.unpaid {
    /* color: var(--color-white); */
    color: #fff;
    font-weight: bold;
    padding: 1px 1rem;
    border-radius: 50px;
}

span.paid {
    background: var(--color-success);
}

span.unpaid {
    background: var(--color-warning);
}

td.action {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

td i {
    font-size: 1.4rem;
    cursor: pointer;
    color: var(--color-info-dark);
    transition: all .3s ease;
}

.ri-eye-line:hover {
    color: var(--color-dark);
}

.ri-edit-circle-line:hover {
    color: var(--color-success);
}

.ri-download-2-line:hover {
    color: var(--color-primary);
}
</style>