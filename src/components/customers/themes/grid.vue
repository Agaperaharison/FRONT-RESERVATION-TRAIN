<script>
import cardCustomerVue from './card.customer.vue'
export default {
    components: {
        cardCustomerVue
    },
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
            </li>
            <li :class="{ active: active_item_nav_bar == 'femme' }" @click="activeItemBar('femme')">
                <span>Woman</span>
                <span>5</span>
            </li>
            <li :class="{ active: active_item_nav_bar == 'homme' }" @click="activeItemBar('homme')">
                <span>Man</span>
                <span>5</span>
            </li>
        </ul>
        <div class="count">
            <span>COUNT : </span>
            <span>34</span>
        </div>
    </nav>
    <div class="cards">
        <card-customer-vue />
        <card-customer-vue />
        <card-customer-vue />
        <card-customer-vue />
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
}

nav ul {
    display: flex;
    gap: .6rem;
    height: 100%;
    align-items: center;
}

nav ul li {
    display: flex;
    align-items: center;
    gap: .5rem;
    height: 65%;
    color: var(--color-info-dark);
    align-items: center;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    cursor: pointer;
    transition: all .3s ease;
}

nav ul li:hover,
nav ul li.active {
    background: var(--color-nav);
    color: var(--color-primary-variant);
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

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: .6rem;
    max-height: 80vh;
    overflow-y: auto;
}
</style>