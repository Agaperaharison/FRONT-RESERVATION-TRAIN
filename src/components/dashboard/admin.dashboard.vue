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
            currentDate: new Date(),
            date_value: new Date().toISOString().substr(0, 10),
            salesArray: [],
            amountArray: [],
            graphValue: [],
            amount: 0,
            paid: 0,
            unpaid: 0,
            total_customers: 0,
            valid_customer: 0,
            total_trips: 0,
            total_reservation: 0,

            maxAmount: 0,
        }
    },
    mounted() {
        this.customers_count();
        this.trips_count();
        this.reservations_count();
        this.getSales();
        this.getTotalAmount();
    },
    methods: {
        async getSales() {
            try {
                const response = await axios.get(`/reservations/get-sales`, { withCredentials: true, });
                this.salesArray = response.data.data;
                const targetDate = this.date_value ? this.date_value : this.currentDate;
                const data = this.salesArray.find(sale => this.formattedDate(sale.createdAt) === this.formattedDate(targetDate));
                if (data) {
                    this.amount = data.totalAmount;
                    this.paid = data.paidAmount;
                    this.unpaid = data.unpaidAmount;
                } else {
                    this.amount = 0;
                    this.paid = 0;
                    this.unpaid = 0;
                }
                this.filterAndCalculateTotal();
            } catch (err) {
                console.log(err.message);
            }
        },
        async getTotalAmount() {
            const response = await axios.get('/reservations/get-total-amount', { withCredentials: true, });
            this.amountArray = response.data.data;
            this.filterAndCalculateTotal();
        },
        async filterAndCalculateTotal() {
            const targetDate = this.date_value ? new Date(this.date_value) : this.currentDate;
            this.amountArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const lastFiveItems = this.amountArray.filter(item => new Date(item.createdAt) <= targetDate).slice(0, 5);
            this.graphValue = lastFiveItems;
            const highestTotalAmount = lastFiveItems.reduce((maxTotalAmount, currentItem) => {
                return Math.max(maxTotalAmount, currentItem.totalAmount);
            }, 0);
            this.maxAmount = highestTotalAmount;
        },
        async customers_count() {
            try {
                const response = await axios.get('/users/count-users', { withCredentials: true, });
                this.total_customers = response.data.data.total;
                this.valid_customer = response.data.data.total_valid;
            } catch (err) {
                console.log(err.message)
            }
        },
        async trips_count() {
            try {
                const response = await axios.get('/trips/count-trips', { withCredentials: true, });
                this.total_trips = response.data.data.total;
            } catch (err) {
                console.log(err.message);
            }
        },
        async reservations_count() {
            try {
                const response = await axios.get('/reservations/count-reservations', { withCredentials: true, });
                this.total_reservation = response.data.data.total
            } catch (err) {
                console.log(err.message);
            }
        },
        formattedDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
    }
}
</script>

<template>
    <div class="main">
        <div class="container">
            <main>
                <div class="header">
                    <h1>DASHBOARD</h1>
                    <div class="date">
                        <input type="date" v-model="date_value" @change="getSales">
                    </div>
                </div>
                <div class="insights">
                    <amount-vue :value="amount" :max="maxAmount" :graph="graphValue" />
                    <paid-vue :value="paid" :total="amount" />
                    <unpaid-vue :value="unpaid" :total="amount" />
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

@media screen and (max-width: 1475px) {
    .container {
        grid-template-columns: auto;
    }

    .right {
        display: none;
    }
}

@media screen and (max-width: 1184px) {
    .insights {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 720px) {
    .insights {
        display: flex;
        flex-direction: column;
    }
}

@media screen and (max-width: 560px) {
    .header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
    }

}
</style>