<script>
export default {
    data() {
        return {
            filter: 'All',
            reservations_lists: [],
            reservations: [],
            date_value: '',
            searchValue: '',
            openModal: false,
            moreInfo: [],
        }
    },
    mounted() {
        this.getReservations();
    },
    methods: {
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
        filterMoreInfo(id) {/*  */
            this.moreInfo = this.reservations_lists.filter(res => res.id === id);
            this.toggleModal();
            //console.log(this.moreInfo)
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
                                <i class="ri-edit-circle-line"></i>
                                <i class="ri-download-2-line"></i>
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
                            <h3>
                                <span>Nationality : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].nationality : null }}</small>
                            </h3>
                            <h3>
                                <span>Sexe : </span>
                                <small>{{ moreInfo.length > 0 ? moreInfo[0].client[0].sexe : null }}</small>
                            </h3>
                        </div>
                        <div class="verify" v-if="moreInfo.length > 0">
                            <h3
                                :class="{ 'invalide': moreInfo[0].client[0].is_validate === 0, 'validate': moreInfo[0].client[0].is_validate === 1 }">
                                <i
                                    :class="{ 'ri-alert-line': moreInfo[0].client[0].is_validate === 0, 'ri-check-fill': moreInfo[0].client[0].is_validate === 1 }"></i>
                                <small>{{ moreInfo[0].client[0].is_validate === 0 ? 'unvalidate' : 'validate' }}</small>
                            </h3>
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
        </div>
    </div>
</template>

<style scoped>
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