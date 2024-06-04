<template>
    <div class="nav">
        <ul>
            <router-link to="/admin-page/setting/update/name">
                <li :class="{ active: $route.path === '/admin-page/setting/update/name' }">
                    <span>Update your name</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/email">
                <li :class="{ active: $route.path === '/admin-page/setting/update/email' }">
                    <span>Update your email</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/phone">
                <li :class="{ active: $route.path === '/admin-page/setting/update/phone' }">
                    <span>Update phone number</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/address">
                <li :class="{ active: $route.path === '/admin-page/setting/update/address' }">
                    <span>Update Address</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/password">
                <li :class="{ active: $route.path === '/admin-page/setting/update/password' }">
                    <span>Update password</span>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<style scoped>
.nav {
    border-radius: 10px;
    overflow: hidden;
}

ul {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 1rem;
}

li {
    min-height: 34px;
    padding: 0 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 50px;
    transition: all .3s ease;
}

li:hover,
li.active {
    background: var(--color-info-primary);
    color: var(--color-primary);
}

li.active i {
    color: var(--color-primary);
}
</style>