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