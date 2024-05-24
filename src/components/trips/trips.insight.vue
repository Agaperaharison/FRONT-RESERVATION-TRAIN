<script>
export default {
    props: ['value']
}
</script>

<template>
    <div class="sales">
        <div class="diddle">
            <i class="ri-pin-distance-line"></i>
            <div class="left">
                <h1>Count trips</h1>
                <ul>
                    <li>
                        <span>Total</span>
                        <span>{{ value }}</span>
                    </li>
                    <li>
                        <span>Available</span>
                        <span>{{ value }}</span>
                    </li>
                    <li>
                        <span>Unaivalable</span>
                        <span>{{ value }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sales {
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: 1rem;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.sales:hover {
    box-shadow: none;
}

.diddle {
    display: flex;
    align-items: center;
    gap: 1rem;
}

i {
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-primary-variant);
    font-size: 3.5rem;
}

.left {
    display: flex;
    flex-direction: column;
    width: 100%;
}

h1:nth-child(1) {
    margin-bottom: 1rem;
    color: var(--color-primary-variant);
}

ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

li {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

li span:nth-child(1) {
    font-weight: 600;
    color: var(--color-info-dark);
    font-size: 1rem;
}

li span:nth-child(2) {
    font-weight: 600;
    color: var(--color-dark);
    font-size: 1.3rem;
}
</style>