<script>
import axios from 'axios'
import bookingVue from './nav-items/booking.vue'
import chatVue from './nav-items/chat.vue'
import personalInfoVue from './nav-items/personal-info.vue'
import personalStoryVue from './nav-items/personal-story.vue'
import statisticsVue from './nav-items/statistics.vue'

export default {
    components: {
        bookingVue, chatVue, personalInfoVue, personalStoryVue, statisticsVue
    },
    data() {
        return {
            active_item_nav_bar: 'all',
            clients_lists: [],
            clients: [],
            searchClient: '',

            openModal: false,
            titleInfo: 'Statistiques',
            info_user: [],
            info_reservations_principal: [],
            info_reservations: [],

            infoNavActive: 'all',
        }
    },
    mounted() {
        this.showAllClients()
    },
    methods: {
        activeItemBar(navItem) {
            this.active_item_nav_bar = navItem;
            if (navItem == 'all') {
                this.showAllClients()
            } else if (navItem == 'debs') {
                this.filterHaveDebs();
            } else if (navItem == 'is_validate' || navItem == 'not_validate') {
                this.filterClientByValidation(navItem);
            } else {
                this.filterClientBySexe(navItem);
            }
        },
        toggleModal() {
            this.openModal = !this.openModal
        },
        activeNavItemMOreInfo(navItem) {
            if (navItem === 'all') {
                this.filterAll();
            } else if (navItem === "paid") {
                this.filterPaidMoreInfo();
            } else {
                this.filterUnpaidMoreInfo();
            }
            this.infoNavActive = navItem;
        },
        async showAllClients() {
            try {
                const response = await axios.get('/users/get-customers-lists/CLIENT', { withCredentials: true, });
                this.clients_lists = response.data.data;
                this.clients = response.data.data;
                //console.log(response.data.data);
            } catch (err) {
                console.log(err.message)
            }
        },
        filterHaveDebs() {
            try {
                const clients_haveDebs = this.clients_lists.filter(client => client.debs === true);
                this.clients = clients_haveDebs
            } catch (err) {
                console.log(err.message)
            }
        },
        filterClientByValidation(value) {
            try {
                const condition = value == 'is_validate' ? 1 : 0;
                const clients_validate = this.clients_lists.filter(client => client.is_validate === condition);
                this.clients = clients_validate
            } catch (err) {
                console.log(err.message)
            }
        },
        filterClientBySexe(value) {
            try {
                const clients = this.clients_lists.filter(client => client.sexe === value);
                this.clients = clients
            } catch (err) {
                console.log(err.message)
            }
        },
        filterClient() {
            try {
                const search = this.searchClient.toLowerCase();
                const clientFiltered = this.clients_lists.filter(client => {
                    return client.last_name.toLowerCase().includes(search) ||
                        client.address.toLowerCase().includes(search) ||
                        client.phone_number.includes(search) ||
                        client.city.toLowerCase().includes(search)
                });
                this.clients = clientFiltered;
            } catch (err) {
                console.log(err.message);
            }
        },
        filterClientById(id) {
            const client = this.clients_lists.filter(user => user.id === id);
            this.info_user = client;
            this.info_reservations_principal = this.info_user[0].reservations
            this.info_reservations = this.info_user[0].reservations
            console.log(this.info_reservations)
            this.toggleModal();
        },
        filterAll() {
            this.info_reservations = this.info_reservations_principal;
        },
        filterPaidMoreInfo() {
            this.info_reservations = this.info_reservations_principal.filter(res => res.unpaid === 0);
        },
        filterUnpaidMoreInfo() {
            this.info_reservations = this.info_reservations_principal.filter(res => res.unpaid > 0);
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
    }
}
</script>

<template>
    <div class="container">
        <nav>
            <ul>
                <li :class="{ active: active_item_nav_bar == 'all' }" @click="activeItemBar('all')">
                    <span>All</span>
                    <span>{{ clients_lists.length }}</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'debs' }" @click="activeItemBar('debs')">
                    <span>Have a debs</span>
                    <span>{{ this.clients_lists.filter(client => client.debs === true).length }}</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'is_validate' }" @click="activeItemBar('is_validate')">
                    <span>Is validate</span>
                    <span>{{ this.clients_lists.filter(client => client.is_validate === 1).length }}</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'not_validate' }" @click="activeItemBar('not_validate')">
                    <span>Is not validate</span>
                    <span>{{ this.clients_lists.filter(client => client.is_validate === 0).length }}</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'femme' }" @click="activeItemBar('femme')">
                    <span>Woman</span>
                    <span>{{ this.clients_lists.filter(client => client.sexe === 'femme').length }}</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'homme' }" @click="activeItemBar('homme')">
                    <span>Man</span>
                    <span>{{ this.clients_lists.filter(client => client.sexe === 'homme').length }}</span>
                    <span class="line"></span>
                </li>
            </ul>
            <div class="count">
                <span>COUNT : </span>
                <span>{{ clients_lists.length }}</span>
            </div>
        </nav>
        <div class="menu">
            <div></div>
            <div class="imput-search">
                <i class="ri-search-line"></i>
                <input type="search" v-model="searchClient" @input="filterClient">
            </div>
        </div>
        <div class="table-customers">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Sexe</th>
                        <th>is validate</th>
                        <th>have a debs</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="clients.length > 0" v-for="client in clients" :key="client.id">
                        <td>{{ client.id }}</td>
                        <td>{{ client.last_name }}</td>
                        <td>
                            <div class="avatar">
                                <img src="../../../assets/imgs/1869679.png" alt="">
                            </div>
                        </td>
                        <td>{{ client.address ? client.address : 'non configured' }}<br>{{ client.address ? client.city : null }}</td>
                        <td>{{ client.phone_number ? client.phone_number : 'non configured' }}</td>
                        <td>{{ client.sexe }}</td>
                        <td>{{ client.is_validate === 1 ? true : false }}</td>
                        <td>{{ client.debs }}</td>
                        <td class="btn">
                            <button @click="filterClientById(client.id)">
                                <span>more info</span>
                                <i class="ri-arrow-right-circle-line"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="9">User not found or database is empty!</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="modal" :class="{ open: openModal }" @click="toggleModal">
            <div class="modal-wrapper" @click="toggleModal">
                <i class="ri-close-fill" @click="toggleModal"></i>
                <h2>MORE INFORMATION ABOUT THE CUSTOMER</h2>
                <div class="info">
                    <div class="image-profile">
                        <img src="../../../assets/imgs/1869679.png" alt />
                    </div>
                    <div class="info-customer">
                        <h3>{{ info_user.length > 0 ? info_user[0].title : null }} {{ info_user.length > 0 ?
                            info_user[0].first_name : null }} {{ info_user.length > 0 ? info_user[0].last_name : null }}
                        </h3>
                        <p>
                            <span class="ri-map-pin-user-line"></span> {{ info_user.length > 0 ? info_user[0].address :
                                null }} {{ info_user.length > 0 ? info_user[0].city : null }} {{ info_user.length > 0 ?
                                info_user[0].postal_code : null }}
                        </p>
                        <p>
                            <span class="ri-map-pin-user-line"></span> Né le {{ info_user.length > 0 ?
                                formattedDate(info_user[0].date_of_birth) : null }}
                        </p>
                        <p>
                            <span class="ri-mail-line"></span> {{ info_user.length > 0 ? info_user[0].email : null }}
                        </p>
                        <p>
                            <span class="ri-phone-line"></span> {{ info_user.length > 0 ? info_user[0].phone_number :
                                null
                            }}
                        </p>
                    </div>
                    <div class="debts">
                        <h3>DEBTS</h3>
                        <p>
                            <span class="ri-"></span> {{ info_user.length > 0 ?
                                (info_user[0].sumUnpaid).toLocaleString('fr-FR') : null }} Ar
                        </p>
                    </div>
                </div>
                <div class="info-reservation">
                    <h2>Reservations that the client has already made</h2>
                    <div class="container-table">
                        <div class="nav-plus">
                            <ul>
                                <li :class="{ active: infoNavActive == 'all' }" @click="activeNavItemMOreInfo('all')">
                                    all
                                    <span>{{ info_reservations_principal.length }}</span>
                                </li>
                                <li :class="{ active: infoNavActive == 'paid' }" @click="activeNavItemMOreInfo('paid')">
                                    paid
                                    <span>{{ (this.info_reservations_principal.filter(res => res.unpaid === 0)).length
                                        }}</span>
                                </li>
                                <li :class="{ active: infoNavActive == 'unpaid' }"
                                    @click="activeNavItemMOreInfo('unpaid')">
                                    Unpaid
                                    <span>{{ (this.info_reservations_principal.filter(res => res.unpaid > 0)).length
                                        }}</span>
                                </li>
                            </ul>
                        </div>
                        <table class="listes-reservation-customer">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Train</th>
                                    <th>From</th>
                                    <th>to</th>
                                    <th>Seats</th>
                                    <th>Rate</th>
                                    <th>Paid</th>
                                    <th>Unpaid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="info_reservations.length > 0" v-for="info in info_reservations"
                                    :key="info.id">
                                    <td>{{ info.id }}</td>
                                    <td>{{ formattedDate(info.trips[0].departure_date) }} <br> à
                                        <small>{{ info.trips[0].departure_time }}</small>
                                    </td>
                                    <td>{{ info.trips[0].trains[0].design }} <br>
                                        <small>{{ info.trips[0].trains[0].train_matricule }}</small>
                                    </td>
                                    <td>{{ info.trips[0].from[0].localisation_city }} {{
                                        info.trips[0].from[0].localisation_postal_code }}</td>
                                    <td>{{ info.trips[0].to[0].localisation_city }} {{
                                        info.trips[0].to[0].localisation_postal_code }}</td>
                                    <td>{{ info.number_of_seats }}</td>
                                    <td>{{ (info.paid + info.unpaid).toLocaleString('fr-FR') }} Ar</td>
                                    <td>{{ (info.paid).toLocaleString('fr-FR') }} Ar</td>
                                    <td>{{ (info.unpaid).toLocaleString('fr-FR') }} Ar</td>
                                    <td><span :class="info.unpaid > 0 ? 'unpaid' : 'paid'">{{ info.unpaid > 0 ? 'unpaid'
                                        : 'paid' }}</span></td>
                                </tr>
                                <tr v-else>
                                    <td colspan="10">This client has never made any bookings with this company.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 1200px) {

    tr th:nth-child(6),
    tr td:nth-child(6) {
        display: none;
    }
}

@media screen and (max-width: 1100px) {

    nav ul li:nth-child(3),
    nav ul li:nth-child(4),
    tr th:nth-child(7),
    tr td:nth-child(7) {
        display: none;
    }
}

@media screen and (max-width: 980px) {

    tr th:nth-child(3),
    tr td:nth-child(3) {
        display: none;
    }
}

@media screen and (max-width: 800px) {

    tr th:nth-child(4),
    tr td:nth-child(4) {
        display: none;
    }
}

@media screen and (max-width: 635px) {

    nav ul li:nth-child(5),
    nav ul li:nth-child(6),
    tr th:nth-child(5),
    tr td:nth-child(5) {
        display: none;
    }
}

@media screen and (max-width: 570px) {

    tr th:nth-child(1),
    tr td:nth-child(1) {
        display: none;
    }
}

@media screen and (max-width: 1166px) {

    .count,
    .count span {
        display: none;
    }
}

.container {
    background: var(--color-white);
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

.modal-wrapper {
    position: relative;
    background: var(--color-white);
    padding: 2rem;
    width: 95%;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;
}

.ri-close-fill {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-info-dark);
    transition: all .2s ease;
}

.ri-close-fill:hover {
    color: var(--color-danger);
}

.modal-wrapper h2 {
    font-size: 1.4rem;
    color: var(--color-info-dark);
    font-weight: 600;
}

.info {
    display: grid;
    grid-template-columns: 100px auto 140px;
    gap: 2rem;
    margin-top: 1rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--color-info-dark);
    margin-bottom: 1rem;
}

.image-profile {
    border-radius: 50%;
    overflow: hidden;
}

.info-customer h3 {
    font-size: 1.2rem;
    color: var(--color-dark);
    margin-bottom: 0.6rem;
}

.info-customer p {
    font-size: 1rem;
    display: flex;
    gap: 1rem;
}

.info-customer p span:nth-child(1) {
    font-size: 1.3rem;
    color: var(--color-dark);
}

.info-reservation h2 {
    color: var(--color-primary-variant);
    font-size: 1.2rem;
    text-decoration: underline;
    text-align: center;
    margin-bottom: 1rem;
}

.info-reservation .container-table {
    max-height: 350px;
    overflow-y: overlay;
}

.debts {
    text-align: center;
}

.debts p {
    font-size: 1.4rem;
    font-weight: 600;
}

.debts h3 {
    font-size: 1.3rem;
    color: var(--color-warning);
    margin-top: 1rem;
    margin-bottom: .5rem;
    text-decoration: underline;
}

.nav-plus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    margin-bottom: 1rem;
}

.nav-plus ul {
    display: flex;
    align-items: center;
    height: 30px;
    gap: 1rem;
}

.nav-plus li {
    padding: 5px 1rem;
    display: flex;
    gap: 10px;
    color: var(--color-info-dark);
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all .3s ease;
}

.nav-plus li.active {
    background: var(--color-light);
    color: var(--color-primary);
}

.nav-plus li span {
    background: var(--color-light);
    padding: 0 4px;
    border-radius: 6px;
    color: var(--color-dark);
}

.paid:hover {
    background: var(--color-success);
    color: #fff;
}

.unpaid:hover {
    background: var(--color-warning);
    color: #fff;
}

.paid {
    font-size: 0.9rem;
    padding: 1px 10px;
    border-radius: 15px;
    background: var(--color-success);
    color: #fff;
    font-weight: 600;
}

.unpaid {
    font-size: 0.9rem;
    padding: 1px 10px;
    border-radius: 15px;
    background: var(--color-warning);
    color: #fff;
    font-weight: 600;
}


nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-top: .5rem;
    margin-bottom: .7rem;
    border-bottom: 2px solid var(--color-light);
}

nav ul {
    display: flex;
    height: 100%;
    align-items: center;
}

nav ul li {
    position: relative;
    display: flex;
    gap: .5rem;
    height: 100%;
    color: var(--color-info-dark);
    align-items: center;
    padding: .6rem 1.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all .3s ease;
}

nav ul li span:nth-child(2) {
    padding: 3px 5px;
    border-radius: 6px;
    background: var(--color-light);
}

.dark-theme-variables nav ul li span:nth-child(2) {
    background: #3b3b3b;
}

nav ul li.active {
    color: var(--color-primary);
}

.line {
    position: absolute;
    width: 100%;
    left: 0;
    padding: 1px 0 0 0;
    bottom: -4px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: all .3s ease;
}

nav ul li:hover {
    color: var(--color-primary);
}

nav ul li.active .line {
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
}

nav .count {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;
}

nav .count span {
    font-size: 1.2rem;
    font-weight: 600;
}

nav .count span:nth-child(1) {
    color: var(--color-info-dark);
}

.menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.table-customers {
    background: var(--color-white);
    margin-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
}

.table-customers:hover {
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
    background: var(--color-white);
}

th:nth-child(1),
td:nth-child(1) {
    padding-left: 1rem;
}

th {
    font-size: 1.1rem;
    height: 3.2rem;
    background: var(--color-info-dark);
    /* color: var(--color-white); */
    color: #fff;
}

td {
    height: 3.4rem;
    padding: 7px 0;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: 600;
}

td:nth-child(2) {
    font-weight: 600;
}

td .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

tr:last-child td {
    border: none;
}

td.btn {
    height: 100%;
}

button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    height: 100%;
    margin: auto;
    padding: 0 1.2rem;
    border-radius: 7px;
    font-size: 1.1rem;
    font-weight: 600;
    background: var(--color-white);
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

button i {
    font-size: 1.5rem;
}

button:hover {
    color: var(--color-primary);
}
</style>