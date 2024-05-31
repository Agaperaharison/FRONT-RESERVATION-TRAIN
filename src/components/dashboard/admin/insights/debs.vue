<script>
export default {
    props: ["value"],
}
</script>

<template>
    <div class="sales">
        <div class="diddle">
            <i class="ri-alarm-warning-line"></i>
            <div class="left">
                <h1>Debs</h1>
                <h1>{{ value.toLocaleString('fr-FR') }} Ar</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sales {
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    margin-top: 1rem;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.sales:hover {
    box-shadow: none;
}


.diddle {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

i {
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-warning);
    font-size: 3.5rem;
}

h3 {
    margin: 1rem 0rem 0.6rem;
    font-size: 1.2rem;
    color: var(--color-info-dark);
}

h1:nth-child(1) {
    color: var(--color-warning);
    margin-bottom: .6rem;
}

h1:nth-child(2) {
    color: var(--color-primary);
}
</style>