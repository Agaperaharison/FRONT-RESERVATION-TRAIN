<script>
export default {
    data() {
        return {
            navItemActive: 'All',
            openFilter: false,
            trips_lists: [],
            trips: [],
            search: '',
        }
    },
    mounted() {
        this.allTrips()
    },
    methods: {
        setActiveNavItem(navItem) {
            this.navItemActive = navItem;
            if (navItem === 'Available') {
                this.availableTrips(1);
            } else if (navItem === 'Unavalaible') {
                this.availableTrips(0);
            } else {
                this.allTrips();
            }
        },
        openModalFilter() {
            this.openFilter = !this.openFilter
        },
        async allTrips() {
            try {
                const response = await axios.get('/trips/get-all-trips');
                this.trips_lists = response.data.data;
                this.trips = response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
        availableTrips(is_available) {
            try {
                const availableTrips = this.trips_lists.filter(trip => trip.is_available === is_available);
                this.trips = availableTrips
            } catch (err) {
                console.log(err.message)
            }
        },
        filterTrips() {
            try {
                const searchValue = this.search.toLowerCase();
                const tripsFiltered = this.trips_lists.filter(trip => {
                    return trip.train.design.toLowerCase().includes(searchValue) ||
                        trip.train.train_matricule.toLowerCase().includes(searchValue) ||
                        trip.departure_date.includes(searchValue) ||
                        trip.departure_time.includes(searchValue) ||
                        trip.from.toLowerCase().includes(searchValue) ||
                        trip.to.toLowerCase().includes(searchValue);
                });
                this.trips = tripsFiltered;
            } catch (err) {
                console.log(err.message);
            }
        }
    }
}
</script>

<template>
    <div class="left">
        <div class="header">
            <h1>The lists of trips</h1>
            <a href="#"><i class="ri-add-fill"></i> <span>add new trip</span></a>
        </div>
        <div class="trips">
            <nav>
                <ul>
                    <li :class="{ active: navItemActive == 'All' }" @click="setActiveNavItem('All')">
                        <span>All</span>
                        <span>{{ trips_lists.length }}</span>
                        <span class="line"></span>
                    </li>
                    <li :class="{ active: navItemActive == 'Available' }" @click="setActiveNavItem('Available')">
                        <span>Available</span>
                        <span>{{ trips_lists.filter(trip => trip.is_available === 1).length }}</span>
                        <span class="line"></span>
                    </li>
                    <li :class="{ active: navItemActive == 'Unavalaible' }" @click="setActiveNavItem('Unavalaible')">
                        <span>Unavalaible</span>
                        <span>{{ trips_lists.filter(trip => trip.is_available === 0).length }}</span>
                        <span class="line"></span>
                    </li>
                </ul>
                <div class="filter">
                    <button id="btn" :class="{ active: openFilter }" @click="openModalFilter">
                        <span>filter</span>
                        <i class="ri-arrow-down-s-fill"></i>
                    </button>
                    <div id="container-filter" :class="{ open: openFilter }">
                        <div class="head">
                            <h2>Filter</h2>
                            <i class="ri-close-fill" @click="openModalFilter"></i>
                        </div>
                        <form action="">
                            <form-group>
                                <label for="">From: </label>
                                <select name="" id="">
                                    <option value="">Select</option>
                                </select>
                            </form-group>
                            <form-group>
                                <label for="">To: </label>
                                <select name="" id="">
                                    <option value="">Select</option>
                                </select>
                            </form-group>
                            <form-group>
                                <button class="submit">filter</button>
                            </form-group>
                        </form>
                    </div>
                    <div class="date">
                        <input type="date">
                    </div>
                </div>
            </nav>
            <div class="menu">
                <div>
                </div>
                <div class="imput-search">
                    <i class="ri-search-line"></i>
                    <input type="search" v-model="search" @input="filterTrips">
                </div>
            </div>
            <div class="list-trips">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Train</th>
                            <th>Departure date</th>
                            <th>from</th>
                            <th>to</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="trips.length > 0" v-for="trip in trips" :key="trip.id">
                            <td>{{ trip.id }}</td>
                            <td>
                                <div>
                                    <span>{{ trip.train.design }}</span> <br> <small>mat: {{ trip.train.train_matricule
                                        }}</small>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{ trip.departure_date }}</span> <br> <small>{{ trip.departure_time }}</small>
                                </div>
                            </td>
                            <td>{{ trip.from }}</td>
                            <td>{{ trip.to }}</td>
                            <td><span
                                    :class="{ available: trip.is_available === 1, unavailable: trip.is_available !== 1 }">{{
                                        trip.is_available === 1 ? 'available' : 'unavailable' }}</span></td>
                            <td class="action">
                                <i class="ri-pages-line"></i>
                                <i class="ri-delete-bin-3-line"></i>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="7" class="empty">Trip not found or database is empty!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header a {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: .5rem;
    transition: all .3s ease;
}

.header a i {
    font-size: 1.5rem;
}

.header a:hover {
    color: var(--color-primary);
}

.trips {
    width: 100%;
    background: var(--color-white);
    box-shadow: var(--box-shadow);
    margin-top: 1rem;
    padding: 0;
    border-radius: 10px;
    transition: all .3s ease;
    overflow: hidden;
}

.trips:hover {
    box-shadow: none;
}

.trips nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
    height: 50px;
    border-bottom: 3px solid var(--color-background);
    margin-bottom: 1rem;
}

nav ul {
    display: flex;
    padding-top: .9rem;
    height: 100%;
    align-items: center;
}

nav ul li {
    position: relative;
    display: flex;
    gap: 10px;
    padding: 0 1.2rem;
    font-size: 1.1rem;
    font-weight: 600;
    height: 100%;
    color: var(--color-info-dark);
    align-items: center;
    cursor: pointer;
    transition: all .3s ease;
}

nav ul li span:nth-child(2) {
    background: var(--color-light);
    padding: 1px 5px;
    border-radius: 7px;
}

li.active {
    color: var(--color-primary);
}

li .line {
    position: absolute;
    border: 2px solid transparent;
    bottom: -4px;
    left: 0;
    width: 100%;
    border-radius: 50%;
    transition: all .3s ease;
}

li.active .line {
    position: absolute;
    border: 2px solid var(--color-primary);
    bottom: -4px;
    left: 0;
    width: 100%;
    border-radius: 50%;
    transition: all .3s ease;
}

.filter {
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.filter button#btn {
    padding: .5rem 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    gap: 1rem;
    border-radius: 6px;
    background: var(--color-white);
    color: var(--color-info-dark);
    border: 1px solid var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

.filter button#btn i {
    transition: all .3s ease;
}

.filter button#btn.active i {
    transform: rotate(90deg);
    color: var(--color-dark);
}

#container-filter {
    position: absolute;
    background: var(--color-white);
    z-index: 99;
    top: 40px;
    right: -14px;
    border: 1px solid var(--color-info-dark);
    border-radius: 8px;
    padding: 1rem;
    width: 250px;
    display: none;
    transition: all .3s ease;
}

#container-filter.open {
    display: block;
}

.head {
    position: relative;
}

.ri-close-fill {
    position: absolute;
    font-size: 1.4rem;
    right: -4px;
    top: -4px;
    color: var(--color-info-dark);
    transition: all .3s ease;
    cursor: pointer;
}

.ri-close-fill:hover {
    color: var(--color-danger);
}

form {
    display: flex;
    flex-direction: column;
}

form-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
}

form-group label {
    font-size: 1.2rem;
    font-weight: 500;
}

form-group select {
    width: 100%;
    padding: .7rem 1rem;
    border-radius: 6px;
    background: var(--color-light);
    color: var(--color-dark);
}

button.submit {
    width: 100%;
    padding: .8rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 7px;
    background: var(--color-light);
    color: var(--color-dark);
    cursor: pointer;
}

.date {
    display: inline-block;
    background: var(--color-light);
    border-radius: var(--border-radius-1);
    padding: 0.5rem 1.5rem;
}

.date input[type="date"] {
    background: transparent;
    color: var(--color-dark);
    font-size: 1.1rem;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .8rem;
}

.menu .imput-search {
    position: relative;
    margin-right: 1rem;
}

.menu i {
    font-size: 1.3rem;
    position: absolute;
    top: 55%;
    left: 6px;
    font-weight: bold;
    color: var(--color-info-dark);
    transform: translateY(-50%);
}

.menu input {
    font-size: 1rem;
    font-weight: 600;
}

.menu input {
    padding: 6px 16px 6px 32px;
    border: 2px solid var(--color-info-light);
    color: var(--color-info-dark);
    border-radius: 7px;
    transition: all .3s ease;
    width: 200px;
}

.dark-theme-variables .menu input {
    background: var(--color-info-light);
    color: var(--color-white);
}

.list-trips {
    width: 100%;
    background: var(--color-white);
    max-height: 74vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 1.5rem;
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
    padding: 1rem;
    font-size: 1.1rem;
    text-align: center;
    font-weight: 600;
    background: var(--color-info-dark);
    color: #fff;
}

th:nth-child(2) {
    padding-left: 0;
}

tbody tr td {
    height: 60px;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 600;
}

td div {
    margin: 1rem 0 0;
    padding: 12px;
    border-radius: 8px;
}

td:nth-child(2) div {
    background: var(--color-light);
}

tr:last-child td {
    border-bottom: none;
}

td:nth-child(2) {
    text-align: center;
    font-weight: bold;
}

td:nth-child(2) span {
    font-size: 1.2rem;
    color: var(--color-dark);
}

td:nth-child(2) small {
    font-size: .9rem;
    color: var(--color-info-dark);
}

td:nth-child(6) span {
    padding: 2px 10px;
    border-radius: 15px;
    background: var(--color-light);
}

td span.avalaible {
    color: var(--color-primary-variant);
}

td span.unavalaible {
    color: var(--color-danger);
}

.action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .9rem;
    gap: 1.4rem;
}

.action i {
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-info-dark);
    transition: all .3s ease;
}

.action i.ri-pages-line:hover {
    color: var(--color-primary);
}

.action i.ri-delete-bin-3-line:hover {
    color: var(--color-danger);
}

.empty {
    text-align: center;
    color: var(--color-info-dark);
}
</style>