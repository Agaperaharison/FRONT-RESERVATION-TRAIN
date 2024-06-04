<script>
import profilVue from './looks/info-profil.vue';
import recetteJourVue from './looks/recette-jour.vue';
export default {
    components: { profilVue, recetteJourVue }
}
</script>

<template>
    <div class="main">
        <h1>Profil ADMIN</h1>
        <div class="container">
            <profil-vue />
            <recette-jour-vue />
        </div>
    </div>
</template>

<style scoped>
h1 {
    margin-bottom: 1rem;
}

.container {
    display: grid;
    gap: 3rem;
    grid-template-columns: auto 35rem;
}
</style>