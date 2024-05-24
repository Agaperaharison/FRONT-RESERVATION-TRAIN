<script>
import insightVue from './admin/insights/insight.vue'
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
        insightVue, amountVue, paidVue, unpaidVue, customersVue, reservationVue, tripsVue, analyticsTableVue, recentTripsVue, notificationVue
    },
}
</script>

<template>
    <div class="container">
        <main>
            <div class="header">
                <h1>DASHBOARD</h1>
                <div class="date">
                    <input type="date">
                </div>
            </div>
            <div class="insights">
                <amount-vue :value="570000" />
                <paid-vue :value="400000" />
                <unpaid-vue :value="170000" />
                <customers-vue :total="599" :valid="500" :invalid="99" />
                <trips-vue :value="45" />
                <reservation-vue :value="1579" />
            </div>
        </main>
        <div class="right">
            <notification-vue/>
        </div>
    </div>
    <div class="recent-Reservations">
        <h2>Analytiques</h2>
        <analytics-table-vue />
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