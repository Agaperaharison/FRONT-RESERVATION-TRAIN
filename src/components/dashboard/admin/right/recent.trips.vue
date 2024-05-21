<script>

</script>

<template>
    <div class="trips">
        <div class="trip">
            <span class="ri-pin-distance-line"></span>
            <div class="info">
                <p>
                    <b>Fianarantsoa vers Manakara</b>
                </p>
                <p>TRAIN TURBO : départ le 24 May 2024</p>
                <small class="text-muted">Time : 05:30</small>
            </div>
        </div>
        <div class="trip">
            <span class="ri-pin-distance-line"></span>
            <div class="info">
                <p>
                    <b>Fianarantsoa vers Manakara</b>
                </p>
                <p>TRAIN TURBO : départ le 24 May 2024</p>
                <small class="text-muted">Time : 05:30</small>
            </div>
        </div>
        <div class="trip">
            <span class="ri-pin-distance-line"></span>
            <div class="info">
                <p>
                    <b>Fianarantsoa vers Manakara</b>
                </p>
                <p>TRAIN TURBO : départ le 24 May 2024</p>
                <small class="text-muted">Time : 05:30</small>
            </div>
        </div>
        <!-- <div class="trip">
            <div class="icon err">
                <span class="ri-emotion-unhappy-line"></span>
            </div>
            <div class="right">
                <div class="info">
                    <p>Database is empty !</p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
.trips {
    background: var(--color-white);
    padding: var(--card-padding) var(--card-padding) 0.8rem;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.trips:hover {
    box-shadow: none;
}

.trip {
    display: flex;
    grid-template-columns: 3rem auto;
    gap: 1rem;
}

.trip {
    margin-bottom: 1rem;
}

.trip:last-child() {
    margin-bottom: 0;
}

.trip span {
    font-size: 2rem;
}
</style>