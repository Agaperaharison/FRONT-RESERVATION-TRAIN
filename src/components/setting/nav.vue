<template>
    <div class="nav">
        <ul>
            <router-link to="/admin-page/setting/update/name">
                <li :class="{ active: $route.path === '/admin-page/setting/update/name' }">
                    <i
                        :class="{ 'ri-checkbox-blank-circle-fill': $route.path === '/admin-page/setting/update/name', 'ri-checkbox-blank-circle-line': $route.path !== '/admin-page/setting/update/name' }"></i>
                    <span>Update your name</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/email">
                <li :class="{ active: $route.path === '/admin-page/setting/update/email' }">
                    <i :class="{ 'ri-checkbox-blank-circle-fill': $route.path === '/admin-page/setting/update/email', 'ri-checkbox-blank-circle-line': $route.path !== '/admin-page/setting/update/email' }"></i>
                    <span>Update your email</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/phone">
                <li :class="{ active: $route.path === '/admin-page/setting/update/phone' }">
                    <i :class="{ 'ri-checkbox-blank-circle-fill': $route.path === '/admin-page/setting/update/phone', 'ri-checkbox-blank-circle-line': $route.path !== '/admin-page/setting/update/phone' }"></i>
                    <span>Update phone number</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/address">
                <li :class="{ active: $route.path === '/admin-page/setting/update/address' }">
                    <i :class="{ 'ri-checkbox-blank-circle-fill': $route.path === '/admin-page/setting/update/address', 'ri-checkbox-blank-circle-line': $route.path !== '/admin-page/setting/update/address' }"></i>
                    <span>Update Address</span>
                </li>
            </router-link>
            <router-link to="/admin-page/setting/update/password">
                <li :class="{ active: $route.path === '/admin-page/setting/update/password' }">
                    <i :class="{ 'ri-checkbox-blank-circle-fill': $route.path === '/admin-page/setting/update/password', 'ri-checkbox-blank-circle-line': $route.path !== '/admin-page/setting/update/password' }"></i>
                    <span>Update password</span>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<style scoped>
.nav {
    background: var(--color-white);
    border-radius: 10px;
    overflow: hidden;
}

li {
    height: 40px;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-left: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
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