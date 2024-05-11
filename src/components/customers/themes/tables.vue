<script>
export default {
    data() {
        return {
            active_item_nav_bar: 'all',
        }
    },
    methods: {
        activeItemBar(navItem) {
            this.active_item_nav_bar = navItem
        }
    }
}
</script>

<template>
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
            <label for="">search: </label>
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
                        <button>
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
                        <button>
                            <span>more info</span>
                            <i class="ri-arrow-right-circle-line"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
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
    padding: 0 1rem;
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
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-right: 1rem;
}
.menu label, .menu input {
    font-size: 1rem;
    font-weight: 600;
}
.menu input {
    padding: 8px 16px;
    background: var(--color-white);
    color: var(--color-dark);
    border-radius: 5px;
    transition: all .3s ease;
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
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
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

td img {
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