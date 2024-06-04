<script>
import navVue from './nav.vue'
export default {
    components: { navVue }
}
</script>

<template>
    <div class="main">
        <div class="container">
            <div class="container-params">
                <h1>PROFIL ADMIN</h1>
            </div>
            <div class="param">
                <h1>Setting</h1>
                <div class="cards">
                    <router-view></router-view>
                </div>
            </div>
            <div>
                <nav-vue />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto 30rem 16rem;
    gap: 1rem;
    width: 100%;
    height: 100%;
}

.param h1 {
    margin-bottom: 2rem;
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