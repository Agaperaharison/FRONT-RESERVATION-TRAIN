<script>
export default {
    data() {
        return {
            listes: [],
            analytics: []
        }
    },
    mounted() {
        this.getLists();
    },
    methods: {
        async getLists() {
            try {
                const response = await axios.get(`/dashboard/get-data-in-analytics`);
                this.listes = response.data.data;
                this.analytics = response.data.data;
                //console.log(this.analytics)
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
    }
}
</script>

<template>
    <div class="table-analytiques">
        <table>
            <thead>
                <tr>
                    <th rowspan="2">#</th>
                    <th rowspan="2">Train design</th>
                    <th rowspan="2">Train matricule</th>
                    <th rowspan="2">From</th>
                    <th rowspan="2">to</th>
                    <th rowspan="2">Departure date & time</th>
                    <th rowspan="1" colspan="3">Seats</th>
                    <th rowspan="2">%</th>
                    <!-- <th rowspan="2">Status</th> -->
                </tr>
                <tr>
                    <th>Total</th>
                    <th>available</th>
                    <th>unavailable</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="analytics.length > 0" v-for="analytic in analytics" :key="analytic.id">
                    <td>{{ analytic.id }}</td>
                    <td>{{ analytic.train[0].design }}</td>
                    <td>{{ analytic.train[0].train_matricule }}</td>
                    <td>{{ analytic.from[0].localisation_city }} {{ analytic.from[0].localisation_postal_code }}</td>
                    <td>{{ analytic.to[0].localisation_city }} {{ analytic.to[0].localisation_postal_code }}</td>
                    <td>{{ formattedDate(analytic.departure_date) }} à {{ analytic.departure_time }}</td>
                    <td>{{ (analytic.train[0].siege).toLocaleString('fr-FR') }}</td>
                    <td>{{ (analytic.train[0].siege - (analytic.seatUnavailable ? analytic.seatUnavailable : 0)).toLocaleString('fr-FR') }}</td>
                    <td>{{ analytic.seatUnavailable ? (analytic.seatUnavailable).toLocaleString('fr-FR') : 0 }}</td>
                    <td>{{ ((analytic.seatUnavailable ? analytic.seatUnavailable : 0) * 100) / analytic.train[0].siege }}%
                        <i v-if="((analytic.seatUnavailable ? analytic.seatUnavailable : 0) * 100) / analytic.train.siege > 50"
                            class="ri-arrow-up-fill"></i>
                        <i v-else
                            class="ri-arrow-down-fill"></i></td>
                    <!-- <td><span class="pending">pending</span></td> -->
                </tr>
                <tr v-else>
                    <td colspan="9" style="text-align:center;">Data not found or database is empty!</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-analytiques {
    background: var(--color-white);
    margin-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    max-height: 300px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
    overflow-y: auto;
}

.table-analytiques:hover {
    box-shadow: none;
}

table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

thead {
    position: sticky;
    top: 0;
    border-bottom: 1px solid var(--color-dark);
    background: var(--color-white);
}

th {
    font-size: 1.1rem;
}

tr:nth-child(1) th {
    padding: 10px 0 0 0;
}

tr:nth-child(2) th {
    padding: 10px 0;
}

td {
    height: 3rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: 500;
}

th:first-child,
td:first-child {
    padding-left: 1rem;
}

tr:last-child td {
    border: none;
}

td:nth-child(2),
td:nth-child(6) {
    font-weight: 600;
}

td:nth-child(7) {
    font-weight: 600;
    color: var(--color-primary-variant);
}

td:nth-child(8) {
    font-weight: 600;
    color: var(--color-info-dark);
}

td span {
    padding: 0.3rem 1rem;
    color: var(--color-white);
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
}

.pending {
    background: var(--color-primary-variant);
}

.unavailable {
    background: var(--color-info-dark);
    color: #fff;
}

td.disabled {
    height: 75px;
    font-size: 1.3rem;
    color: var(--color-info-dark);
}

.recent-Reservations a {
    text-align: center;
    display: block;
    margin: 1rem auto;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
}

.ri-arrow-up-fill {
    color: var(--color-success);
}

.ri-arrow-down-fill {
    color: var(--color-danger);
}
</style>