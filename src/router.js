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
import updateName from './components/setting/formulaire/form-name.vue'
import updateEmail from './components/setting/formulaire/form-email.vue'
import updatePhone from './components/setting/formulaire/form-phone.vue'
import updateAddress from './components/setting/formulaire/form-address.vue'
import updatePassword from './components/setting/formulaire/form-password.vue'

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
            {
                path: 'setting', component: setting,
                children: [
                    {path: '', component: updateName },
                    {path: 'update/name', component: updateName },
                    {path: 'update/email', component: updateEmail },
                    {path: 'update/phone', component: updatePhone },
                    {path: 'update/address', component: updateAddress },
                    {path: 'update/password', component: updatePassword },
                ]
            },
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