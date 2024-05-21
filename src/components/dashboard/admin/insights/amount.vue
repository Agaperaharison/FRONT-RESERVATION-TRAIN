<script>
export default {
    props: ["value"],
}
</script>

<template>
    <div class="sales">
        <div class="diddle">
            <div class="left">
                <i class="ri-wallet-3-fill"></i>
                <h3>Total amount</h3>
                <h1>{{ value }} Ar</h1>
            </div>
            <div class="chart">
                <div class="container-chart">
                    <span style="height: 34%;"></span>
                </div>
                <div class="container-chart">
                    <span style="height: 90%;"></span>
                </div>
                <div class="container-chart">
                    <span style="height: 67%;"></span>
                </div>
                <div class="container-chart">
                    <span style="height: 57%;"></span>
                </div>
                <div class="container-chart">
                    <span style="height: 100%;"></span>
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

i {
    background: var(--color-primary);
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-white);
    font-size: 2rem;
}

.diddle {
    display: grid;
    grid-template-columns: auto 5rem;
    align-items: center;
    justify-content: space-between;
}

h3 {
    margin: 1rem 0rem 0.6rem;
    font-size: 1.2rem;
    color: var(--color-info-dark);
}
.chart {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    width: 100%;
    height: 70%;
}

.chart .container-chart {
    position: relative;
}

.chart .container-chart span {
    position: absolute;
    width: 100%;
    border-radius: 6px;
    background: var(--color-primary);
    bottom: 0;
    animation: animate 1s;
}

@keyframes animate {
    0% {
        height: 0;
    }
}

small {
    margin-top: 1.6rem;
    display: block;
}
</style>