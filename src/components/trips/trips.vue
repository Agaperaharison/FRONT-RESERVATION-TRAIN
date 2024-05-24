<script>
import leftVue from './left.vue'
import rightVue from './right.vue'

export default {
    components: {
        leftVue, rightVue
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<template>
    <div class="container">
        <left-vue/>
        <right-vue/>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto 25rem;
    gap: 2rem;
    width: 100%;
    height: 100%;
}
</style>