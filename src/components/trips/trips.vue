<script>
import leftVue from './left.vue'
import rightVue from './right.vue'
import io from 'socket.io-client';
export default {
    components: {
        leftVue, rightVue
    },
    data() {
        return {
            socket: null,
        }
    },
    created() {
        this.socket = io('http://localhost:8081');
        this.socket.on('connect_error', error => {
            console.error('Socket.io connection error:', error);
        });
        this.socket.on('haveNotif', players => {
            //this.fireToast(players[0].notification_info.title, players[0].notification_info.description, 'success', 'ok')
        });
    },
    beforeDestroy() {
        this.socket.close();
    },
    methods: {
        fireToast(title, message, icon, btn) {
            Toast2.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: btn
            });
        },
    }
}
</script>

<template>
    <div class="main">
        <div class="container">
            <left-vue />
            <right-vue />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto 25rem;
    gap: 2rem;
    width: 100%;
    height: 100%;
}
</style>