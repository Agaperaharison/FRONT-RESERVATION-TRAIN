import './assets/main.css'
import './assets/icones/remixicon.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import $ from 'jquery';
import Swal from 'sweetalert2';
import axios from 'axios';

var Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: true,
    timer: 5000
});
var Toast2 = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: true,
    timer: 5000
});

var mySwal = Swal.mixin({
    toast: true,
    position: 'center',
    showCancelButton: true,
    confirmButtonText: 'oui, supprimer',
    cancelButtonText: 'annuler',
});

axios.defaults.baseURL = `http://localhost:8081/project-IHM/reservation-train/api`;

createApp(App).use(router).mount('#app')

window.$ = $;
window.Toast = Toast;
window.Toast2 = Toast2;
window.mySwal = mySwal;
window.axios = axios;
