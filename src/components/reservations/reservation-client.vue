<script>
export default {
    data() {
        return {
            reservations_default: [],
            reservations: [],
        }
    },
    mounted() {
        this.getMyReservation();
    },
    methods: {
        async getMyReservation() {
            try {
                const response = await axios.get('/reservations/get-reservations-client', { withCredentials: true, });
                console.log(response.data.data);
                this.reservations_default = response.data.data;
                this.reservations = response.data.data;
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
    },
}
</script>

<template>
    <div class="container">
        <div class="header">
            <h2>RESERVATIONs</h2>
            <router-link to="/client-page/trips-page" class="add">
                <i class="ri-add-fill"></i>
                <span>add reservation</span>
            </router-link>
        </div>
        <div class="lists-reservations">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Train</th>
                        <th>Date and time</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Seat</th>
                        <th>price</th>
                        <!-- <th>rate</th> -->
                        <th>total</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="reservations.length > 0" v-for="reservation in reservations" :key="reservation.id">
                        <td>{{ reservation.id }}</td>
                        <td>{{ reservation.trips[0].trains[0].design }} <br> <small>mat: {{
                            reservation.trips[0].trains[0].train_matricule }}</small></td>
                        <td>{{ formattedDate(reservation.trips[0].departure_date) }} <br> at {{ reservation.trips[0].departure_time }}
                        </td>
                        <td>{{ reservation.trips[0].from[0].localisation_city }} <br> loc: <small>{{
                            reservation.trips[0].from[0].latitude }}, {{ reservation.trips[0].from[0].longitude }}</small></td>
                        <td>{{ reservation.trips[0].to[0].localisation_city }} <br> loc: <small>{{
                            reservation.trips[0].to[0].latitude }}, {{ reservation.trips[0].to[0].longitude }}</small></td>
                        <td>{{ reservation.number_of_seats }}</td>
                        <td>{{ reservation.trips[0].price }} Ar</td>
                        <!-- <td>32 000 Ar x 2</td> -->
                        <td>{{ reservation.number_of_seats * reservation.trips[0].price }} Ar</td>
                        <td><span :class="reservation.unpaid > 0 ? 'unpaid' : 'paid'">{{ reservation.unpaid > 0 ?
                                'unpaid' : 'paid' }}</span></td>
                    </tr>
                    <tr v-else>
                        <td>122</td>
                        <td>TRAIN N°01</td>
                        <td>23 May 2024 at 14:45</td>
                        <td>Fianarantsoa <br> loc: 12.666556, 18.554546</td>
                        <td>Manakara</td>
                        <td>2</td>
                        <td>32 000 Ar</td>
                        <!-- <td>32 000 Ar x 2</td> -->
                        <td>64 000 Ar</td>
                        <td><span class="unpaid">paid</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
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

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add {
    display: flex;
    gap: 10px;
    align-items: center;
    background: var(--color-light);
    margin-right: 1rem;
    padding: .7rem 1.4rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all .3s ease;
}

.add:hover {
    background: var(--color-primary);
    color: #fff;
}

.lists-reservations {
    margin-top: 2rem;
    height: 70vh;
    border-radius: 1rem;
    overflow: hidden;
}

.lists-reservations:hover {
    overflow-y: overlay;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    position: sticky;
    height: 50px;
}

tr th {
    background: var(--color-light);
    font-size: 1.2rem;
    font-weight: 600;
    border-bottom: 1px solid var(--color-info-dark);
}

td {
    height: 60px;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid var(--color-info-dark);
}

td:nth-child(2),
td:nth-child(6) {
    font-weight: 600;
}

td:nth-child(8) {
    font-weight: 600;
    color: var(--color-primary-variant);
}

tr:last-child td {
    border-bottom: none;
}

td span {
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 50px;
}

span.paid {
    color: var(--color-success);
}

span.unpaid {
    color: var(--color-warning);
}
</style>