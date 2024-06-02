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
            agents: [],
        }
    },
    mounted() {
        this.agentsLists();
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
                const response = await axios.get('/users/get-customers-lists/AGENT', { withCredentials: true, });
                this.lists_agents = response.data.data;
                this.agents = response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
        filter(value) {
            try {
                const agentFiltered = this.lists_agents.filter(agent => agent.sexe === value);
                this.agents = agentFiltered
            } catch (err) {
                console.log(err.message)
            }
        },
    }
}
</script>

<template>
    <nav>
        <ul>
            <li :class="{ active: active_item_nav_bar == 'all' }" @click="activeItemBar('all')">
                <span>All</span>
                <span>{{ lists_agents.length }}</span>
            </li>
            <li :class="{ active: active_item_nav_bar == 'femme' }" @click="activeItemBar('femme')">
                <span>Woman</span>
                <span>{{ this.lists_agents.filter(agent => agent.sexe === "femme").length }}</span>
            </li>
            <li :class="{ active: active_item_nav_bar == 'homme' }" @click="activeItemBar('homme')">
                <span>Man</span>
                <span>{{ this.lists_agents.filter(agent => agent.sexe === "homme").length }}</span>
            </li>
        </ul>
        <div class="count">
            <span>COUNT : </span>
            <span>{{ lists_agents.length }}</span>
        </div>
    </nav>
    <div class="cards">
        <card-customer-vue v-if="agents.length > 0" v-for="agent in agents" :key="agent.id"
            :old="agent.title" :tache="agent.nombre_de_tache" :matricule="agent.matricule" :last_name="agent.last_name"
            :email="agent.email" />

        <div class="card-add-new-agent">
            <router-link to="/admin-page/new-agent">
                <i class="ri-user-add-line"></i>
                <span>New Agent</span>
            </router-link>
        </div>
    </div>
    .
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