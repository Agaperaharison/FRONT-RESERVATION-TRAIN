<script>
import navVue from './nav.vue'
import navBarVue from './navbar.vue'
import allInfoVue from './formulaire/all-info.vue'
export default {
    components: { navVue, navBarVue, allInfoVue }
}
</script>

<template>
    <div class="main">
        <div class="header">
            <h1>Profile settings</h1>
            <nav-bar-vue/>
        </div>
        <div class="container">
            <div>
                <all-info-vue/>
            </div>
            <div class="param">
                <div class="cards">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.container {
    display: grid;
    grid-template-columns: auto 30rem 16rem;
    gap: 2rem;
    width: 100%;
    height: 100%;
}

h1 {
    color: var(--color-info-dark);
}

.cards {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}

.card {
    background: var(--color-white);
    padding: 2rem 3rem;
    border-radius: var(--border-radius-2);
}

.card h2 {
    color: var(--color-info-dark);
    font-size: 1.2rem;
}
</style>