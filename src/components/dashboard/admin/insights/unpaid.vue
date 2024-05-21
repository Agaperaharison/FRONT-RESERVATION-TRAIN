<script>
export default {
    props: ["value"],
}
</script>

<template>
    <div class="sales">
        <div class="diddle">
            <div class="left">
                <i class="ri-money-euro-circle-line"></i>
                <h3>Total unpaid</h3>
                <h1>{{ value }} Ar</h1>
            </div>
            <div class="progress">
                <svg>
                    <circle cx="38" cy="38" r="36" />
                    <circle cx="38" cy="38" r="36" class="animated-circle" />
                </svg>
                <div class="number">
                    <p>0%</p>
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
    background: var(--color-warning);
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-white);
    font-size: 2rem;
}

.diddle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h3 {
    margin: 1rem 0rem 0.6rem;
    font-size: 1.2rem;
    color: var(--color-info-dark);
}
.progress {
    position: relative;
}

svg {
    width: 7rem;
    height: 7rem;
}

svg circle {
    fill: none;
    stroke: var(--color-warning);
    stroke-width: 14;
    stroke-linecap: round;
    stroke-dasharray: 222;
    stroke-dashoffset: 222;
    transform: translate(10px, 10px);
    transition: stroke-dashoffset 1s ease-in-out;
}

svg circle:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: var(--color-light);
}

svg circle.animated-circle {
    stroke-dashoffset: 222px;
}

.number {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

small {
    margin-top: 1.6rem;
    display: block;
}
</style>