<script>
export default {
    props: ["total", "valid"],
}
</script>

<template>
    <div class="sales">
        <div class="diddle">
            <i class="ri-team-line"></i>
            <div class="left">
                <h1>Customers</h1>
                <div class="value-item">
                    <div>
                        <small>Total</small>
                        <h3>{{ total.toLocaleString('fr-FR') }}</h3>
                    </div>
                    <div>
                        <small>Validate</small>
                        <h3>{{ valid.toLocaleString('fr-FR') }}</h3>
                    </div>
                </div>
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
.left {
    width: 100%;
}
i {
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-info-dark);
    font-size: 3.5rem;
}

h3 {
    margin: 1rem 0rem 0.6rem;
    font-size: 1.2rem;
    color: var(--color-info-dark);
}
h1 {
    color: var(--color-dark);
    margin-bottom: .6rem;
}
.value-item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 5px;
}
.value-item div {
    padding: 0;
    margin: 0;
    padding: 0 8px 0 0;
    text-align: center;
}
.value-item div small{
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 5px;
}
.value-item div h3 {
    margin: 0;
}
.value-item div:nth-child(1) small,
.value-item div:nth-child(1) h3 {
    color: var(--color-primary-variant);
}
.value-item div:nth-child(2) small,
.value-item div:nth-child(2) h3 {
    color: var(--color-success);
}
.value-item div:nth-child(3) small,
.value-item div:nth-child(3) h3 {
    color: var(--color-warning);
}
</style>