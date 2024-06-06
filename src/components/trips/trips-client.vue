<script>
export default {
    data() {
        return {
            modal: false,
            trips_default: [],
            trips: [],
            numberOfSeat: 1,
            trip_id: '',
            price: 0,
            client_id: 4,
            password: ''
        }
    },
    mounted() {
        this.tripsList();
    },
    methods: {
        fireToast(title, message, icon, btn) {
            Toast.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: btn
            });
        },
        openModal() {
            this.modal = !this.modal
        },
        getPriceTrip(id, price) {
            this.openModal();
            this.trip_id = id
            this.price = price
        },
        async tripsList() {
            try {
                const response = await axios.get('/trips/get-all-trips');
                //console.log(response.data.data);
                this.trips_default = response.data.data;
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
        async add() {
            try {
                const verify = await this.verifyPassword(this.client_id, this.password);
                if (!verify) {
                    this.password = '';
                    this.fireToast('ERROR!', 'Incorrect password !', 'error', 'ok');
                    return
                }
                const response = await axios.post('/reservations/client-add-new-reservation', {
                    trip_id: this.trip_id, client_id: this.client_id, number_of_seats: this.numberOfSeat, unpaid: this.numberOfSeat * this.price
                }, { withCredentials: true, });
                //console.log(response.data.data);
                if(response.data.status){
                    this.fireToast('Successfully!', 'Reservation has created successfully!', 'success', 'ok');
                    this.numberOfSeat = 1;
                    this.modal = false
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async verifyPassword(id, password) {
            try {
                const response = await axios.get(`/auth/verify-password/${id}/${password}`);
                return response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
    },
}
</script>

<template>
    <div class="container">
        <h2>Trips available lists</h2>
        <div class="trips-lists">
            <div class="card" v-if="trips.length > 0" v-for="trip in trips" :key="trip.id">
                <div class="left">
                    <img src="../../assets/imgs/pexels-mtcd-5588646.jpg" alt="">
                </div>
                <div class="right">
                    <h2>{{ trip.train[0].design }}</h2>
                    <h3>{{ trip.from[0].localisation_city }} to {{ trip.to[0].localisation_city }}</h3>
                    <h3 class="success"><span>PRICE : </span> {{ trip.price }} Ar</h3>
                    <p><span>Departure : </span> <span> {{ formattedDate(trip.departure_date) }}</span></p>
                    <p><span>at : </span> <span> {{ trip.departure_time }}</span></p>
                </div>
                <button @click="getPriceTrip(trip.id, trip.price)">
                    <i class="ri-"></i>
                    <span>add a reservation</span>
                </button>
            </div>
        </div>

        <div :class="{ open: this.modal }" id="modal" @click="openModal">
            <div class="modal-wrapper" @click="openModal">
                <i class="ri-close-fill" @click="openModal"></i>
                <form action="">
                    <div class="from-group">
                        <label for="seat">Nomber of seat</label>
                        <p>The price of this trips is {{ price }} Ar.</p>
                        <p>D: {{ price }} Ar x {{ numberOfSeat }} = <span>{{ price * numberOfSeat }} Ar</span></p>
                        <input type="number" v-model="numberOfSeat" id="seat">
                    </div>
                    <div class="from-group">
                        <label for="password" style="margin-top:1rem">Enter your password to confirm</label>
                        <input type="password" v-model="password" id="password">
                    </div>
                    <button @click.prevent="add">confirm</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
#modal {
    display: none;
}

#modal.open {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-wrapper {
    position: relative;
    background: var(--color-white);
    padding: var(--card-padding) var(--card-padding) .5rem;
    border-radius: 1rem;
}

.modal-wrapper i.ri-close-fill {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

.from-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.from-group p {
    margin: 0;
    font-size: 1rem;
}

p span {
    color: var(--color-primary-variant);
}

.modal-wrapper label {
    font-size: 1.2rem;
    font-weight: 600;

}

.modal-wrapper input {
    border: 1px solid var(--color-info-dark);
    padding: .8rem 1rem;
    border-radius: 8px;
}

.modal-wrapper button {
    width: 100%;
    padding: .7rem;
}

i.ri-close-fill:hover {
    color: var(--color-danger);
}

.container {
    margin-top: 60px;
    max-height: calc(100% - 70px);
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    transition: all .3s ease;
}

.container:hover {
    box-shadow: none;
}

.trips-lists {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 2rem;
    max-height: 70vh;
    overflow: hidden;
}

.trips-lists:hover {
    overflow-y: overlay;
}

.card {
    border: 2px solid var(--color-light);
    border-radius: var(--card-border-radius);
    text-align: center;
    overflow: hidden;
}

.left {
    margin-bottom: 1rem;
}

.right h3 {
    font-size: 1rem;
}

.dg {
    display: grid;
    gap: 1rem;
    grid-template-columns: 9rem auto;
}

.dgr {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
}

p {
    font-weight: 600;
    margin-top: 5px;
}

button {
    margin-top: .7rem;
    margin-bottom: 1rem;
    padding: .8rem 2rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-primary);
    background: var(--color-white);
    border: 1px solid var(--color-primary);
    transition: all .3s ease;
}

button:hover {
    background: var(--color-primary);
    color: #fff;
}
</style>