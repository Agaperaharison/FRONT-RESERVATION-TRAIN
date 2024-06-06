<script>

</script>

<template>
    <nav>
        <h1>I'm a CLIENT</h1>
        <ul>
            <router-link to="/client-page/home-page">
                <li :class="{ active: $route.path === '/client-page/home-page' || $route.path === '/client-page' }">
                    <i class="ri-home-5-line"></i>
                    <span>home</span>
                </li>
            </router-link>
            <router-link to="/client-page/trips-page">
                <li :class="{ active: $route.path === '/client-page/trips-page' }">
                    <i class="ri-pin-distance-line"></i>
                    <span>trips</span>
                </li>
            </router-link>
            <router-link to="/client-page/reservations-page">
                <li :class="{ active: $route.path === '/client-page/reservations-page' }">
                    <i class="ri-calendar-2-line"></i>
                    <span>Rservation</span>
                </li>
            </router-link>
            <router-link to="/client-page/profil-page">
                <li :class="{ active: $route.path === '/client-page/profil-page' }">
                    <i class="ri-user-line"></i>
                    <span>Your profil</span>
                </li>
            </router-link>
            <router-link to=""></router-link>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: var(--color-white);
}

nav h1 {
    color: var(--color-info-dark);
}

ul {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    height: 40px;
}

li {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all .3s ease;
    cursor: pointer;
}

li:hover,
li.active {
    color: var(--color-primary);
}
</style>