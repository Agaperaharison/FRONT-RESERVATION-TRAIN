<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            socket: null,
            info_user_connected: [],
            message_all: [],
            message: [],
            id: '',
            idRecev: '',
            message_input: '',
            acti: '',
        }
    },
    created() {
        this.socket = io('http://localhost:8081');
        this.socket.on('connect_error', error => {
            console.error('Socket.io connection error:', error);
        });
        this.socket.on('new-message', () => {
            this.getListUser();
            this.message_input = "";
        })
    },
    beforeDestroy() {
        this.socket.close();
    },
    mounted() {
        this.infoAdmin();
        this.getListUser();
    },
    methods: {
        async infoAdmin() {
            try {
                const response = await axios.get(`/auth/get-info-admin`, { withCredentials: true });
                this.info_user_connected = response.data.data;
                this.id = response.data.data.id
            } catch (err) {
                console.log(err.message);
            }
        },
        async sendMessage() {
            try {
                /* const response = await axios.post('/chats/send-message', {
                    message: this.message_input,
                    idRece: this.idRecev,
                    idSender: this.id,
                    uuid: this.acti
                }); */
                const data = {
                    message: this.message_input,
                    idRece: this.idRecev,
                    idSender: this.id,
                    uuid: this.acti
                }
                this.socket.emit('create', data);
            } catch (err) {
                console.log(err.message)
            }
        },
        async getListUser() {
            try {
                const response = await axios.get(`/chats/all-contact`, { withCredentials: true });
                this.message_all = response.data.data;
                this.message = response.data.data;
                this.idRecev = this.idRecev==="" ? response.data.data[0].sent[0].id : this.idRecev;
                this.acti = this.acti === '' ? response.data.data[0].uuid_message : this.acti;
            } catch (err) {
                console.log(err.message);
            }
        },
        listeUser(data) {
            this.message_all = data;
            this.message = data;
            this.idRecev = data[0].sent[0].id;
            this.acti = data[0].uuid_message;
        },
        filterMessage(id, idRecev) {
            try {
                const filtered_messages = this.message_all.filter(message => message.uuid_message === id);
                this.message = filtered_messages;
                this.idRecev = idRecev;
                this.acti = id;
                this.message_input = "";
            } catch (err) {
                console.log(err.message)
            }
        },
    },
}
</script>

<template>
    <div class="main">
        <div class="chats">
            <div class="lists-user">
                <h2>Contacte</h2>
                <ul>
                    <li v-if="message_all.length > 0" v-for="chat in message_all" :key="chat.uuid_message"
                        @click="filterMessage(chat.uuid_message, chat.sent[0].id)"
                        :class="{ acti: this.acti == chat.uuid_message }">
                        <div class="avatar">
                            <img src="../../assets/imgs/1869679.png" alt="">
                        </div>
                        <div class="name">
                            <h3>{{ chat.sent[0].last_name }}</h3>
                            <p>{{ chat.messages[chat.messages.length - 1].content }}</p>
                            <small>5min ago</small>
                        </div>
                        <i class="ri-checkbox-blank-circle-fill etat"
                            :class="{ 'actif': chat.messages[chat.messages.length - 1].is_read === 0, 'inactif': chat.messages[chat.messages.length - 1].is_read === 1 }"></i>
                    </li>
                </ul>
            </div>

            <div class="container-chat" v-if="message.length > 0">
                <div class="header">
                    <div class="avatar">
                        <img src="../../assets/imgs/1869679.png" alt="">
                    </div>
                    <div class="name">
                        <h4>{{ message[0].sent[0].first_name + ' ' + message[0].sent[0].last_name }}</h4>
                        <p>Role: <span class="success">{{ message[0].sent[0].role }}</span></p>
                    </div>
                </div>
                <div class="body">
                    <ul>
                        <div class="container-mess">
                            <li id="mess" v-for="chat in message[0].messages" :key="chat.id">
                                <p :class="{ 'received': chat.user_id !== id, 'sent': chat.user_id === id }">
                                    {{ chat.content }}
                                </p>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="footer">
                    <input type="text" v-model="message_input">
                    <button class="ri-send-plane-fill" @click.prevent="sendMessage"></button>
                </div>
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-chat {
    padding: 1rem;
}

.container-chat .header {
    display: grid;
    align-items: center;
    height: 50px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: var(--color-light);
    gap: 1rem;
    grid-template-columns: 50px auto;
}

h4 {
    font-size: 1.1rem;
}

.body {
    border: 2px solid var(--color-light);
    height: calc(100% - 8rem);
}

.body ul {
    position: relative;
    height: 100%;
    overflow: hidden;
    display: grid;
}

.container-mess {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: grid;
}

#mess {
    position: relative;
}

#mess p {
    max-width: 80%;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
}

.received {
    background-color: var(--color-success);
    color: white;
    float: left;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.sent {
    background-color: var(--color-light);
    border: 1px solid var(--color-info-light);
    color: var(--color-dark);
    float: right;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.footer {
    border: 2px solid var(--color-light);
    display: flex;
    gap: 10px;
    padding: .5rem;
    font-weight: 500;
    align-items: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.footer input {
    border: 1px solid var(--color-info-dark);
    padding: 10px 1rem;
    border-radius: 5rem;
    width: 100%;
    background: var(--color-white);
    color: var(--color-dark);
}

.footer button {
    background: transparent;
    font-size: 2.3rem;
    color: var(--color-primary-variant);
    cursor: pointer;
}

.main {
    position: relative;
    height: 100vh;
    overflow-y: hidden;
}

.chats {
    background: var(--color-white);
    display: grid;
    grid-template-columns: 20rem 30rem auto;
    gap: 2rem;
    height: 100%;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--box-shadow);
    overflow: hidden;
}

.lists-user,
.container-chat {
    max-height: 100%;
    overflow: hidden;
}

.lists-user ul {
    margin-top: 1rem;
    display: flex;
    gap: 5px;
    flex-direction: column;
    max-height: 100%;
    overflow: hidden;
}

ul:hover {
    overflow-y: overlay;
}


.lists-user li {
    position: relative;
    border: 1px solid var(--color-light);
    display: grid;
    gap: 10px;
    border-radius: 6px;
    align-items: center;
    grid-template-columns: 60px auto;
    cursor: pointer;
    transition: all .3s ease;
    background: var(--color-white);
}

.lists-user li .avatar {
    border-radius: 50%;
    overflow: hidden;
}

.lists-user li:hover,
.lists-user li.acti {
    background: var(--color-light);
}

.name h3 {
    margin-bottom: 6px;
    font-size: 1.1rem;
}

.etat {
    position: absolute;
    right: 10px;
    top: 10px;
}

.etat#actif {
    color: var(--color-success);
}

.etat#inactif {
    color: var(--color-info-dark);
}
</style>