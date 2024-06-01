<script>
export default {
    props: [
        "data"
    ],
    data() {
        return {
            itemActive: 'all',
            reservations_lists: this.data,
            reservations: this.data,
        }
    },
    mounted(){
    },
    methods: {
        activeItem(item) {
            this.itemActive = item
        }
    }
}
</script>

<template>
    <h1>Reservation story</h1>
    <div class="filter">
        <ul>
            <li :class="{ active: itemActive == 'all' }" @click="activeItem('all')">
                <span>all</span>
                <span>{{ reservations_lists.length }}</span>
            </li>
            <li :class="{ active: itemActive == 'paid' }" @click="activeItem('paid')">
                <span>paid</span>
                <span>0</span>
            </li>
            <li :class="{ active: itemActive == 'unpaid' }" @click="activeItem('unpaid')">
                <span>unpaid</span>
                <span>0</span>
            </li>
        </ul>
        <span class="count">{{ reservations_lists.length }}</span>
    </div>
    <div class="lists-booking">
        <table>
            <thead>
                <tr>
                    <th>Reservation Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Seats</th>
                    <th>Rate</th>
                    <th>Paid</th>
                    <th>Unpaid</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="reservations.length > 0" v-for="reservation in reservations" :key="reservation.id">
                    <td><span>{{ reservation.createdAt }}</span><br><small>à {{ reservation.createdAt }}</small></td>
                    <td>Fianarantsoa</td>
                    <td>Manakara</td>
                    <td>02 seats</td>
                    <td>25 000 Ar x 2</td>
                    <td>15 000 Ar</td>
                    <td>10 000 Ar</td>
                </tr>
                <tr v-else>
                    <td colspan="7">Empty!</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.filter {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

ul {
    display: flex;
    align-items: center;
    gap: 1rem;
}

li {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1.4rem;
    height: 30px;
    font-weight: 600;
    font-size: 1rem;
    color: var(--color-info-dark);
    border-radius: 50px;
    border: none;
    cursor: pointer;
    transition: all .3s ease;
}

li.active {
    background: var(--color-background);
    color: var(--color-primary);
}

.count {
    font-size: 1.2rem;
    font-weight: 600;
    background: var(--color-background);
    color: var(--color-info-dark);
    padding: 6px 10px 4px;
    border-radius: 5px;
}

.lists-booking {
    width: 100%;
    background: var(--color-light);
    max-height: 465px;
    border-radius: 10px;
    overflow-y: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    position: sticky;
    top: 0;
    background: var(--color-info-dark);
    color: #fff;
}

th {
    font-size: 1.1rem;
    height: 3.2rem;
    background: var(--color-info-dark);
    padding: 0 1rem;
    text-align: left;
    /* color: var(--color-white); */
    color: #fff;
}

td {
    height: 3rem;
    padding: 7px 1rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: 600;
}

td:nth-child(6) {
    color: var(--color-success);
}

td:last-child {
    color: var(--color-warning);
}
</style>