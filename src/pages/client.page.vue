<script>
import navBarVue from "../components/layouts/nav-bar.vue";
export default {
    components: { navBarVue }
}
</script>

<template>
    <section>
        <nav-bar-vue />
        <router-view></router-view>
    </section>
</template>

<style scoped>
section {
    padding: 20px 10% 0;
    height: 100vh;
}
</style>