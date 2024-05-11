<script>
export default {
    data() {
        return {
            active_item_nav_bar: 'all',
            openModal: false,
        }
    },
    methods: {
        activeItemBar(navItem) {
            this.active_item_nav_bar = navItem
        },
        toggleModal(){
            this.openModal = !this.openModal
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
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'recente' }" @click="activeItemBar('recente')">
                    <span>Recent</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'debs' }" @click="activeItemBar('debs')">
                    <span>Have a debs</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'is_validate' }" @click="activeItemBar('is_validate')">
                    <span>Is validate</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'not_validate' }" @click="activeItemBar('not_validate')">
                    <span>Is not validate</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'femme' }" @click="activeItemBar('femme')">
                    <span>Femme</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
                <li :class="{ active: active_item_nav_bar == 'homme' }" @click="activeItemBar('homme')">
                    <span>Homme</span>
                    <span>5</span>
                    <span class="line"></span>
                </li>
            </ul>
            <div class="count">
                <span>COUNT : </span>
                <span>34</span>
            </div>
        </nav>
        <div class="menu">
            <div></div>
            <div class="imput-search">
                <i class="ri-search-line"></i>
                <input type="search" name="" id="">
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
                    <tr>
                        <td>122</td>
                        <td>Joshué Agapé</td>
                        <td>
                            <div class="avatar">
                                <img src="../../../assets/imgs/1869679.png" alt="">
                            </div>
                        </td>
                        <td>Ambalapaiso Fianarantsoa</td>
                        <td>034 35 626 26</td>
                        <td>homme</td>
                        <td>true</td>
                        <td>true</td>
                        <td class="btn">
                            <button @click="toggleModal">
                                <span>more info</span>
                                <i class="ri-arrow-right-circle-line"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>122</td>
                        <td>Joshué Agapé</td>
                        <td>
                            <div class="avatar">
                                <img src="../../../assets/imgs/1869679.png" alt="">
                            </div>
                        </td>
                        <td>Ambalapaiso Fianarantsoa</td>
                        <td>034 35 626 26</td>
                        <td>homme</td>
                        <td>true</td>
                        <td>true</td>
                        <td class="btn">
                            <button @click="toggleModal">
                                <span>more info</span>
                                <i class="ri-arrow-right-circle-line"></i>
                            </button>
                        </td>
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
                    <h3>Joshué Agapé</h3>
                    <ul>
                        <li class="active">Personal information</li>
                        <li>Personal information</li>
                        <li>Personal information</li>
                        <li>Personal information</li>
                        <li>Personal information</li>
                    </ul>
                </div>
                <div class="container-info-client">
                    <h1>About</h1>
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 1rem auto;
}

.nav h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-white);
    text-align: center;
}

.nav ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 2rem;
}

.nav ul li {
    font-size: 1.1rem;
    font-weight: 600;
    padding: .6rem 1rem;
    color: var(--color-white);
    border-radius: 7px;
    cursor: pointer;
}

.nav ul li.active {
    background: var(--color-info-light);
    color: var(--color-dark);
}

.dark-theme-variables .nav ul li.active {
    color: var(--color-white);
}

.container-info-client {
    width: 100%;
    padding: 2rem 3rem 2rem 1.5rem;
}

.container-info-client h1 {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--color-info-dark);
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
    height: 50px;
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
    padding: 0 1.5rem;
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
    border-radius: 90px;
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
    border-radius: 10px;
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