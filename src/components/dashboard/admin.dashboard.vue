<script>
import amountVue from './admin/insights/amount.vue'
import paidVue from './admin/insights/paid.vue'
import unpaidVue from './admin/insights/unpaid.vue'
import customersVue from './admin/insights/customers.vue'
import reservationVue from './admin/insights/reservation.vue'
import tripsVue from './admin/insights/trips.vue'
import analyticsTableVue from './admin/analytics/tables.vue'
import recentTripsVue from './admin/right/recent.trips.vue'
import notificationVue from './admin/right/notification.vue'

export default {
    components: {
        amountVue, paidVue, unpaidVue, customersVue, reservationVue, tripsVue, analyticsTableVue, recentTripsVue, notificationVue
    },
    data() {
        return {
            amount: 0,
            paid: 0,
            unpaid: 0,
            total_customers: 0,
            valid_customer: 0,
            total_trips: 0,
            total_reservation: 0,
            date_value: '',
        }
    },
    mounted() {
        this.customers_count();
        this.trips_count();
        this.reservations_count();
        this.sales();
    },
    methods: {
        async sales(date) {
            try {
                const response = await axios.get(`/reservations/total-sales/${date}`)
                console.log(response.data.data);
            } catch (err) {
                console.log(err.message)
            }
        },
        // response.data.data : total, total_valid, total_invalid
        async customers_count() {
            try {
                const response = await axios.get('/users/count-users');
                this.total_customers = response.data.data.total;
                this.valid_customer = response.data.data.total_valid;
            } catch (err) {
                console.log(err.message)
            }
        },
        // response.data.data : total, tripsDeleted, tripsNotDeleted
        async trips_count() {
            try {
                const response = await axios.get('/trips/count-trips');
                this.total_trips = response.data.data.total;
            } catch (err) {
                console.log(err.message);
            }
        },
        // response.data.data : isNotReset, isReset, total
        async reservations_count() {
            try {
                const response = await axios.get('/reservations/count-reservations');
                this.total_reservation = response.data.data.total
            } catch (err) {
                console.log(err.message);
            }
        },
    }
}
</script>

<template>
    <div>
        <div class="container">
            <main>
                <div class="header">
                    <h1>DASHBOARD</h1>
                    <div class="date">
                        <input type="date" v-model="date_value">
                    </div>
                </div>
                <div class="insights">
                    <amount-vue :value="amount" />
                    <paid-vue :value="paid" />
                    <unpaid-vue :value="unpaid" />
                    <customers-vue :total="total_customers" :valid="valid_customer" />
                    <trips-vue :value="total_trips" />
                    <reservation-vue :value="total_reservation" />
                </div>
            </main>
            <div class="right">
                <notification-vue />
            </div>
        </div>
        <div class="recent-Reservations">
            <h2>Analytiques</h2>
            <analytics-table-vue />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto 20rem;
    gap: 1.6rem;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.insights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.right {
    padding-left: 0.8rem;
}

h2 {
    margin-bottom: 0.8rem;
}
</style>