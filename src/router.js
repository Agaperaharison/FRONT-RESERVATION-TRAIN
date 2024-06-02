import { createRouter, createWebHistory } from "vue-router";
import authPage from './pages/auth.page.vue'
import signin from './components/auths/signin.vue'
import signup from './components/auths/signup.vue'

import appPage from './pages/admin.page.vue'
import dashboardAdmin from './components/dashboard/admin.dashboard.vue'
import customers from './components/customers/customers.vue'
import styleGrid from './components/customers/themes/grid.vue'
import styleTable from './components/customers/themes/tables.vue'
import addAgent from './components/customers/themes/add-agent.vue'
import analytiques from './components/analytiques/analytiques.vue'
import trips from './components/trips/trips.vue'
import reservations from './components/reservations/reservations.vue'
import setting from './components/setting/setting.vue'
import help from './components/helps/helps.vue'

import appPageClient from './pages/client.page.vue'


const routes = [
    {
        path: '/',
        component: authPage,
        children: [
            { path: '', component: signin },
            { path: 'sign-in', component: signin },
            { path: 'sign-up', component: signup },
        ]
    },
    {
        path: '/admin-page',
        component: appPage,
        children: [
            { path: 'dashboard', component: dashboardAdmin },
            {
                path: 'customers', component: customers,
                children: [
                    { path: 'clients', component: styleTable },
                    { path: 'agents', component: styleGrid },
                ]
            },
            { path: 'new-agent', component: addAgent },
            { path: 'analytiques', component: analytiques },
            { path: 'trips', component: trips },
            { path: 'reservations', component: reservations },
            { path: 'setting', component: setting },
            { path: 'help', component: help },
        ]
    },
    {
        path: '/client-page',
        component: appPageClient

    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;