<script>
import sidebarVue from '@/components/layouts/sidebar.vue'

export default {
    components: {
        sidebarVue
    }
}
</script>
<template>
    <sidebar-vue />
    <router-view></router-view>
</template>