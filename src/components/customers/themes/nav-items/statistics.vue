<script>
import reservationVue from '@/components/dashboard/admin/insights/reservation.vue'
import informationVue from '@/components/dashboard/admin/insights/information.vue'
import debsVue from '@/components/dashboard/admin/insights/debs.vue'

export default {
    components: {
        reservationVue, informationVue,debsVue
    }
}
</script>

<template>
    <h1>Statistiques</h1>
    <div class="insight">
        <information-vue :value="75"/>
        <reservation-vue :value="10" />
        <debs-vue :value="34000"/>
    </div>
</template>

<style scoped>
.insight {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

h1 {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--color-info-dark);
    transition: all .1s ease;
}
</style>>