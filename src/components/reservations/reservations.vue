<script>
export default {
    data() {
        return {
            filter: 'All',
            reservations_lists: [],
            reservations: [],
            date_value: '',
            searchValue: '',
        }
    },
    mounted() {
        this.getReservations();
    },
    methods: {
        async getReservations() {
            try {
                const response = await axios.get('/reservations/all-reservations');
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
                    this.formattedDate(res.createdAt) === this.formattedDate(this.date_value) && res.unpaid > 0
                })
            }
        },
        search(){
            const search = this.searchValue.toLowerCase();
            const data = this.reservations_lists.filter(res => {
                return res.client[0].last_name.toLowerCase().includes(search) ||
                res.trip[0].from[0].localisation_city.toLowerCase().includes(search) ||
                res.trip[0].from[0].localisation_postal_code.includes(search) || 
                res.trip[0].to[0].localisation_city.includes(search) || 
                res.trip[0].to[0].localisation_postal_code.includes(search)
            })
            this.reservations = data;
        }
    }
}
</script>

<template>
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
                            <i class="ri-eye-line"></i>
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
    </div>
</template>

<style scoped>
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