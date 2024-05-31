<script>
import cardCustomerVue from './card.customer.vue'
export default {
    components: {
        cardCustomerVue
    },
    data() {
        return {
            active_item_nav_bar: 'all',
            lists_agents: [],

            count_all: 0,
            count_woman: 0,
            count_man: 0,
        }
    },
    mounted() {
        this.agentsLists();
        this.showNumber();
    },
    methods: {
        activeItemBar(navItem) {
            this.active_item_nav_bar = navItem
            if (navItem == 'all') {
                this.agentsLists();
            } else {
                this.filter(navItem)
            }
        },
        async agentsLists() {
            try {
                const response = await axios.get('/users/lists-customers/agents');
                this.lists_agents = response.data.data;
                this.count_all = response.data.data.length;
            } catch (err) {
                console.log(err.message)
            }
        },
        async filter(value) {
            try {
                const response = await axios.get(`/users/filter-agent-by/sexe/${value}`);
                this.lists_agents = response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
        async count(value){
            const response = await axios.get(`/users/filter-agent-by/sexe/${value}`);
            return response.data.data.length
        },
        async showNumber(){
            this.count_woman = await this.count('femme');
            this.count_man = await this.count('homme');
        }
    }
}
</script>

<template>
    <nav>
        <ul>
            <li :class="{ active: active_item_nav_bar == 'all' }" @click="activeItemBar('all')">
                <span>All</span>
                <span>{{ count_all }}</span>
            </li>
            <li :class="{ active: active_item_nav_bar == 'femme' }" @click="activeItemBar('femme')">
                <span>Woman</span>
                <span>{{ count_woman }}</span>
            </li>
            <li :class="{ active: active_item_nav_bar == 'homme' }" @click="activeItemBar('homme')">
                <span>Man</span>
                <span>{{ count_man }}</span>
            </li>
        </ul>
        <div class="count">
            <span>COUNT : </span>
            <span>{{ count_all }}</span>
        </div>
    </nav>
    <div class="cards">
        <card-customer-vue v-if="lists_agents.length > 0" v-for="agent in lists_agents" :key="agent.id"
            :old="agent.title" :tache="0" :matricule="agent.matricule" :last_name="agent.last_name"
            :email="agent.email" />

        <div class="card-add-new-agent">
            <a href="#">
                <i class="ri-user-add-line"></i>
                <span>New Agent</span>
            </a>
        </div>
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
    height: 70%;
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

.card-add-new-agent {
    background: var(--color-white);
    height: 210px;
    border-radius: var(--border-radius-3);
}

.card-add-new-agent a {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 100%;
    width: 100%;
    justify-content: center;
    color: var(--color-info-dark);
    border-radius: var(--border-radius-3);
    border: 1px solid transparent;
    transition: all .3s ease;
}

.card-add-new-agent a:hover {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
}

.card-add-new-agent i {
    font-size: 2.5rem;
}

.card-add-new-agent span {
    font-size: 1.6rem;
    font-weight: 600;
}
</style>