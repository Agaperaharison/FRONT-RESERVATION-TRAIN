<script>
import io from 'socket.io-client'; 
export default {
    data(){
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
            //this.fireToast(players[0].notification_info.title ,players[0].notification_info.description, 'success', 'ok')
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
            <div class="header">
                <h1>Custommers lists</h1>
                <div class="liste-style">
                    <ul>
                        <router-link to="/admin-page/customers/clients">
                            <li :class="{ active: $route.path === '/admin-page/customers/clients' }">
                                <i class="ri-team-line"></i>
                                <span>Clients</span>
                            </li>
                        </router-link>
                        <!-- <router-link to="/admin-page/customers/agents">
                            <li :class="{ active: $route.path === '/admin-page/customers/agents' }">
                                <i class="ri-customer-service-2-line"></i>
                                <span>Agents</span>
                            </li>
                        </router-link> -->
                    </ul>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.main {
    overflow: hidden;
}
.container h1:nth-child(1) {
    margin-top: .6rem;
    text-transform: uppercase;
    overflow: hidden;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    /* border-bottom: 2px solid var(--color-info-dark); */
}

.liste-style ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 25px;
    height: 40px;
}

.liste-style ul li {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    height: 100%;
    padding: .5rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

.liste-style ul li.active {
    background: var(--color-primary);
    color: #fff;
}

.liste-style ul li i {
    min-width: 30px;
}
@media screen and (max-width: 760px) {
.header {
    flex-direction: column;
    gap: 1rem;
    /* border-bottom: 2px solid var(--color-info-dark); */
}
}

</style>