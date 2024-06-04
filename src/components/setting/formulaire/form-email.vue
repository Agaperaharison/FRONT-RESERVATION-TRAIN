<script>
export default {
    data() {
        return {
            info_user: [],
            id: '',
            password: '',
            email: '',
            alert_message_type: '',
            alert_message: '',
        }
    },
    mounted() {
        this.infoAdmin();
    },
    methods: {
        async infoAdmin() {
            try {
                const response = await axios.get(`/auth/get-info-admin`, { withCredentials: true });
                this.info_user = response.data.data;
                this.id = response.data.data.id;
                this.email = response.data.data.email;
            } catch (err) {
                console.log(err.message);
            }
        },
        async verifyPassword(id, password) {
            try {
                const response = await axios.get(`/auth/verify-password/${id}/${password}`);
                return response.data.data;
            } catch (err) {
                console.log(err.message)
            }
        },
        async updateEmail() {
            try {
                const verify = await this.verifyPassword(this.id, this.password);
                if (!verify) {
                    this.password = '';
                    this.alert_message_type = 'error';
                    this.alert_message = "Incorrect password !";
                    return
                }
                if (this.email != this.info_user.email) {
                    const response = await axios.post(`/auth/update-email-user/${this.id}`, {
                        email: this.email
                    });
                    if (response.data.status) {
                        this.password = '';
                        this.alert_message_type = 'success';
                        this.alert_message = "Success! your email address has updated successfuly";
                    }
                    this.infoAdmin();
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    },
}
</script>

<template>
    <div class="card">
        <h2>Update personal info</h2>
        <p>You can change your email address as often as you like!</p>
        <form action="#">
            <div v-if="alert_message_type !== ''"
                :class="{ 'error-message': alert_message_type == 'error', 'success-message': alert_message_type == 'success' }"
                id="message">
                <i class="ri-alert-line"></i>
                <p>{{ alert_message }}</p>
            </div>
            <div class="form-group">
                <label for="email">Address email</label>
                <input type="email" v-model="email" id="email">
            </div>
            <div class="form-group">
                <label for="password">Enter the password to confirm</label>
                <input type="password" v-model="password" id="password">
            </div>
            <div class="form-group">
                <button @click.prevent="updateEmail">save</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.card h2 {
    color: var(--color-info-dark);
    font-size: 1.2rem;
}

form {
    margin-top: 1rem;
}

i {
    color: var(--color-info-dark);
    font-size: 1.3rem;
}

p {
    color: var(--color-info-dark);
}

.form-group {
    position: relative;
    display: flex;
    flex-direction: column;
}

label {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-dark);
    margin-bottom: 6px;
}

input {
    padding: .6rem 1rem;
    border-radius: 7px;
    background: var(--color-white);
    color: var(--color-dark);
    font-size: 1.1rem;
    border: 1px solid var(--color-info-dark);
    margin-bottom: 1rem;
    transition: all .3s ease;
}

input:focus {
    border: 1px solid var(--color-primary);
}

button {
    width: 100px;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 10px;
    border-radius: 8px;
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

button:hover {
    background: var(--color-primary);
    color: #fff;
}
</style>