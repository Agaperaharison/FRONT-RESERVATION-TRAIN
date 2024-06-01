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
            this.titleInfo = navItem
        },
        async showAllClients() {
            try {
                const response = await axios.get('/users/get-customers-lists/CLIENT');
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
                        client.city.toLowerCase().includes(search) ||
                        client.postal_code.includes(search)
                });
                this.clients = clientFiltered;
            } catch (err) {
                console.log(err.message);
            }
        },
        filterClientById(id) {
            const client = this.clients_lists.filter(user => user.id === id);
            this.info_user = client;
            //console.log(this.info_user[0]);
            this.toggleModal();
        }
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
                        <td>{{ client.address }}<br>{{ client.city }}</td>
                        <td>{{ client.phone_number }}</td>
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
                <div class="nav">
                    <div class="avatar-client">
                        <img src="../../../assets/imgs/pexels-mtcd-5588646.jpg" alt="">
                    </div>
                    <h3>{{ info_user.length > 0 ? info_user[0].last_name : null }}</h3>
                    <hr>
                    <ul>
                        <li :class="{ active: titleInfo == 'Statistiques' }"
                            @click="activeNavItemMOreInfo('Statistiques')">Statistiques</li>
                        <li :class="{ active: titleInfo == 'Basic information' }"
                            @click="activeNavItemMOreInfo('Basic information')">Personal information</li>
                        <li :class="{ active: titleInfo == 'Booking story' }"
                            @click="activeNavItemMOreInfo('Booking story')">Booking story</li>
                        <li :class="{ active: titleInfo == 'Story personal' }"
                            @click="activeNavItemMOreInfo('Story personal')">Personal story </li>
                        <li :class="{ active: titleInfo == 'Chat' }" @click="activeNavItemMOreInfo('Chat')">Chat</li>
                    </ul>
                </div>
                <div class="container-info-client">
                    <statistics-vue v-if="titleInfo == 'Statistiques'" />

                    <personal-info-vue v-if="titleInfo == 'Basic information'" :first_name="info_user[0].first_name" :last_name="info_user[0].last_name" :title="info_user[0].title" :birth="info_user[0].date_of_birth" :phone_number="info_user[0].phone_number" :email="info_user[0].email" :address="info_user[0].address" :city="info_user[0].city" :code="info_user[0].postal_code" :nationality="info_user[0].nationality" />

                    <booking-vue v-if="titleInfo == 'Booking story'" :data="info_user[0].reservations"/>
                    <personal-story-vue v-if="titleInfo == 'Story personal'" />
                    <chat-vue v-if="titleInfo == 'Chat'" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    display: flex;
    width: 90%;
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

.nav {
    min-width: 250px;
    background: var(--color-dark);
    height: 100%;
    padding: 1.6rem;
}

.nav .avatar-client {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    margin: 1rem auto;
}

.nav h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-white);
    text-align: center;
}

hr {
    width: 100%;
    border: 1px solid var(--color-info-light);
    margin-top: 2rem;
}

.nav ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 2rem;
}

.nav ul li {
    font-size: 1.1rem;
    font-weight: 600;
    padding: .6rem 1rem;
    color: var(--color-white);
    border-radius: 7px;
    cursor: pointer;
    transition: all .3s ease;
}

.nav ul li:hover,
.nav ul li.active {
    background: var(--color-primary);
    color: #ffff;
}

.container-info-client {
    width: 100%;
    padding: 2rem 3rem 2rem 1.5rem;
}

.container {
    border-radius: 10px;
    background: var(--color-white);
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
    overflow: hidden;
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
    height: 3rem;
    padding: 7px 0;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: 500;
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