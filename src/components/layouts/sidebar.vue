<script>
export default {
    data() {
        return {
            open: true,
            modeDark: false,
            theme: 'Dark mode'
        }
    },
    mounted() {
        this.getTheme();
        this.getThemeSidebar();
    },
    methods: {
        getThemeSidebar() {
            var themeSidebar = localStorage.getItem('themeSidebar');
            if (themeSidebar == "close") {
                this.open = false;
            }
        },
        toggleSidebar() {
            this.open = !this.open;
            var themeSidebar = localStorage.getItem('themeSidebar');
            if (themeSidebar == "close") {
                localStorage.setItem('themeSidebar', 'open');
            } else {
                localStorage.setItem('themeSidebar', 'close');
            }
        },
        getTheme() {
            var themePage = localStorage.getItem('classTheme');
            var themePageName = localStorage.getItem('nameTheme');
            if (themePage != null) {
                document.body.className = themePage;
                if (themePage == 'dark-theme-variables') {
                    this.modeDark = true;
                    this.theme = themePageName;
                }
            }
        },
        setNameTheme() {
            var nameTheme = localStorage.getItem('nameTheme');
            const balise = document.querySelector(".nameTheme");
            const balise2 = document.querySelector(".nameTheme2");
            balise.innerText = nameTheme;
            balise2.innerText = nameTheme;
        },
        toggleThemPage() {
            this.modeDark = !this.modeDark
            var themePage = localStorage.getItem('classTheme');
            if (themePage == "dark-theme-variables") {
                localStorage.setItem('classTheme', 'light-theme-variables');
                localStorage.setItem('nameTheme', 'Dark mode');
            } else {
                localStorage.setItem('classTheme', 'dark-theme-variables');
                localStorage.setItem('nameTheme', 'Light mode');
            }
            this.getTheme();
            this.setNameTheme();
        }
    }
}
</script>

<template>
    <div id="sidebar" :class="{ open: this.open }">
        <div class="logo_details">
            <i class="ri-train-line icone"></i>
            <div class="logo_name">I'm <span>ADMIN</span></div>
            <i id="btn" class="ri-menu-4-fill" @click="toggleSidebar"></i>
        </div>
        <ul class="nav-list">
            <li :class="{ active : $route.path === '/admin-page/dashboard' }">
                <router-link to="/admin-page/dashboard">
                    <i class="ri-dashboard-3-line"></i>
                    <span class="link_name">Dashboard</span>
                </router-link>
                <span class="tooltip">Dashboard</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/customers' || $route.path === '/admin-page/customers/ ' || $route.path === '/admin-page/customers/more-info' }">
                <router-link to="/admin-page/customers">
                    <i class="ri-team-line"></i>
                    <span class="link_name">Customers</span>
                </router-link>
                <span class="tooltip">Customers</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/analytiques' }">
                <router-link to="/admin-page/analytiques">
                    <i class="ri-pie-chart-line"></i>
                    <span class="link_name">Analytiques</span>
                </router-link>
                <span class="tooltip">Analytiques</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/trips' }">
                <router-link to="/admin-page/trips">
                    <i class="ri-map-pin-line"></i>
                    <span class="link_name">Trips</span>
                </router-link>
                <span class="tooltip">Trips</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/reservations' }">
                <router-link to="/admin-page/reservations">
                    <i class="ri-calendar-todo-fill"></i>
                    <span class="link_name">Reservations</span>
                </router-link>
                <span class="tooltip">Reservations</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/setting' }">
                <router-link to="/admin-page/setting">
                    <i class="ri-settings-4-line"></i>
                    <span class="link_name">Setting</span>
                </router-link>
                <span class="tooltip">Setting</span>
            </li>
            <li :class="{ active : $route.path === '/admin-page/help' }">
                <router-link to="/admin-page/help">
                    <i class="ri-lightbulb-fill"></i>
                    <span class="link_name">help?</span>
                </router-link>
                <span class="tooltip">help?</span>
            </li>
            <li>
                <div class="mode" :class="{ dark: modeDark }">
                    <div class="moon-sun">
                        <i class="ri-moon-fill icon moon"></i>
                        <i class="ri-sun-line icon sun"></i>
                    </div>
                    <span class="mode-text nameTheme">{{ theme }}</span>
                    <div class="toggle-switch" @click="toggleThemPage">
                        <span class="switch"></span>
                    </div>
                </div>
                <span class="tooltip nameTheme2">{{ theme }}</span>
            </li>
            <li class="profile">
                <div class="profile_detail">
                    <div class="img-profil">
                        <img src="../../assets/imgs/pexels-mtcd-5588646.jpg" alt="profile image">
                    </div>
                    <div class="profile_content">
                        <div class="name">Joshué Agapé</div>
                        <div class="designation">Web Developer</div>
                    </div>
                    <i class="ri-logout-circle-r-line" id="log_out"></i>
                </div>
            </li>
        </ul>
    </div>
    <section id="section">
        <router-view></router-view>
    </section>
</template>

<style>
#sidebar {
    min-height: 100vh;
    width: 76px;
    padding: 6px 14px;
    z-index: 99;
    background: var(--color-white);
    transition: all .5s ease;
    position: fixed;
    top: 0;
    left: 0;
}

#sidebar.open {
    width: 250px;
}

#sidebar .logo_details {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
}

#sidebar .logo_details i {
    color: var(--color-dark);
}

#sidebar .logo_details .icone {
    opacity: 0;
    transition: all 0.5s ease;
}

#sidebar .logo_details .logo_name {
    color: var(--color-dark);
    font-size: 22px;
    font-weight: 600;
    opacity: 0;
    text-wrap: nowrap;
    transition: all .5s ease;
}

#sidebar.open .logo_details .icone,
#sidebar.open .logo_details .logo_name {
    opacity: 1;
}

.logo_name span {
    color: var(--color-primary);
    font-weight: bold;
}

#sidebar .logo_details #btn {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all .5s ease;

}

#sidebar.open .logo_details #btn {
    text-align: right;
}

#sidebar i {
    color: var(--color-info-dark);
    height: 60px;
    line-height: 60px;
    min-width: 50px;
    font-size: 2.5rem;
    text-align: center;
}

#sidebar .nav-list {
    margin-top: 20px;
    height: 100%;
}

#sidebar li {
    position: relative;
    margin: 8px 0;
    list-style: none;
    height: 45px;
}

#sidebar li .tooltip {
    position: absolute;
    top: -20px;
    left: calc(100% + 15px);
    z-index: 3;
    background-color: var(--color-white);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 14px;
    font-size: 15px;
    border-radius: 5px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
}

#sidebar li:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    transition: all .4s ease;
    top: 50%;
    transform: translateY(-50%);
}

#sidebar.open li .tooltip {
    display: none;
}

#sidebar li a {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    background-color: var(--color-white);
    transition: all .3s ease;
    z-index: 12;
}

#sidebar li.active a,
#sidebar li a:hover {
    background: var(--color-primary);
    border-radius: 5px;
}

#sidebar li a .link_name {
    color: var(--color-info-dark);
    font-size: 1.1rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: auto;
    transition: all .3s ease;
    pointer-events: none;
    opacity: 0;
}

#sidebar li a:hover .link_name,
#sidebar li a:hover i,
#sidebar li.active a .link_name,
#sidebar li.active a i {
    transition: all .3s ease;
    color: #fff;
}

#sidebar.open li a .link_name {
    opacity: 1;
    pointer-events: auto;
}

#sidebar li i {
    height: 35px;
    line-height: 35px;
    font-size: 1.5rem;
    border-radius: 5px;
    font-weight: 600;
}

#sidebar li.profile {
    position: fixed;
    width: 78px;
    left: 0;
    bottom: -7px;
    padding: 0 14px;
    overflow: hidden;
    transition: all .5s ease;
}

#sidebar.open li.profile {
    width: 250px;
}

#sidebar .profile .profile_detail {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 100%;
}

#sidebar li .img-profil {
    height: 35px;
    width: 35px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 14px;
}

#sidebar li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#sidebar li.profile .name,
#sidebar li.profile .designation {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-dark);
    white-space: nowrap;
    opacity: 0;
}

#sidebar.open li.profile .name,
#sidebar.open li.profile .designation {
    opacity: 1;
}

#sidebar li.profile .designation {
    font-weight: 400;
    font-size: 12px;
}

#sidebar .profile #log_out {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: var(--color-light);
    color: var(--color-danger);
    width: 100%;
    height: 100%;
    line-height: 44px;
    border-radius: 0;
    cursor: pointer;
    transition: all .5s ease;
}

#sidebar.open .profile #log_out {
    width: 50px;
    background: none;
}

#sidebar.open~#section {
    left: 250px;
    width: calc(100% - 250px);
}

#section {
    position: relative;
    background: var(--color-background);
    min-height: 100vh;
    padding: 1rem 2rem;
    top: 0;
    left: 78px;
    width: calc(100% - 78px);
    transition: all .5s ease;
    z-index: 2;
}

.mode {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background: var(--color-light);
}

.mode .moon-sun {
    height: 45px;
    width: 50px;
    display: flex;
    align-items: center;
}

.mode i {
    position: absolute;
    transition: all .3s ease;
}

.mode i.sun {
    opacity: 0;
}

#sidebar.open .mode i {
    color: var(--color-dark);
}

#sidebar.open .mode-text {
    font-size: 1rem;
    color: var(--color-dark);
    font-weight: 600;
    opacity: 1;
}

#sidebar .mode-text {
    opacity: 0;
}

.mode.dark i.sun {
    opacity: 1;
}

.mode.dark i.moon {
    opacity: 0;
}

.mode .toggle-switch {
    position: absolute;
    right: 0;
    display: flex;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.toggle-switch .switch {
    position: relative;
    height: 22px;
    width: 44px;
    border-radius: 25px;
    border: 1px solid var(--color-info-dark);
    background: var(--color-info-light);
}

.switch::before {
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background: var(--color-info-dark);
    transition: all .4s ease;
}

.mode.dark .toggle-switch .switch {
    background: var(--color-primary);
}

.mode.dark .switch::before {
    background: var(--color-white);
    left: 25px;
}
</style>