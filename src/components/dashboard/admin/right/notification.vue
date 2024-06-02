<script>
import io from 'socket.io-client'; 
export default {
    data() {
        return {
            socket: null,
            notifications: [],
        }
    },
    mounted() {
        this.getNotif();
    },
    created() {
        this.socket = io('http://localhost:8081');
        this.socket.on('connect_error', error => {
            console.error('Socket.io connection error:', error);
        });
        this.socket.on('haveNotif', players => {
            this.notifications = players;
        });
    },
    beforeDestroy() {
        this.socket.close();
    },
    methods: {
        async getNotif() {
            try {
                const response = await axios.get(`/dashboard/get-notification/admin`, { withCredentials: true, });
                //console.log(response.data.data)
                this.notifications = response.data.data
            } catch (err) {
                console.log(err.message)
            }
        },
        formattedDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
        formattedTime(time) {
            return new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        },
    }
}
</script>

<template>
    <div class="notifications">
        <h2>Notifications</h2>
        <div class="lists">
            <ul>
                <li v-if="notifications.length > 0" v-for="notification in notifications" :key="notification.id">
                    <span class="title"> <b>N</b> {{ notification.notification_info.title }}</span>
                    <span>{{ notification.notification_info.description }}</span>
                    <small>{{ formattedDate(notification.createdAt) }}, {{ formattedTime(notification.createdAt)
                        }}</small>
                </li>
                <li v-else>
                    <span class="title"> <b>N</b> Title</span>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
                    <small></small>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.notifications {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 7px;
    overflow: hidden;
}

h2 {
    margin: 8px 1rem;
}

.lists {
    width: 100%;
    margin-top: .4rem;
    box-shadow: var(--box-shadow);
}

ul,
li {
    display: flex;
    flex-direction: column;
}

li {
    padding: .8rem 1rem;
    background: var(--color-white);
    margin-top: 5px;
    border-radius: 7px;
    transition: all .3s ease;
}

.lists:hover {
    box-shadow: none;
}

li span:first-child {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: .6rem;
}

span b {
    /* border: 1px solid var(--color-info-dark); */
    padding: 5px 8px;
    font-size: .8rem;
    border-radius: 50%;
    background: var(--color-info-dark);
    color: #fff;
}

li span:nth-child(2) {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 4px;
    color: var(--color-dark);
}

li small {
    font-size: .9rem;
    font-weight: 600;
    color: var(--color-info-dark);
}
</style>