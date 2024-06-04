<script>
export default {
    data() {
        return {
            info_user: [],
            first_name: '',
            last_name: '',
            password: '',
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
                //console.log(response.data.data)
                this.info_user = response.data.data;
                this.first_name = response.data.data.first_name
                this.last_name = response.data.data.last_name
            } catch (err) {
                console.log(err.message);
            }
        },
        async updateName() {
            try {
                const verify = await this.verifyPassword(this.info_user.id, this.password);
                if (!verify) {
                    this.password = '';
                    this.alert_message_type = 'error';
                    this.alert_message = "Incorrect password !";
                    return
                }
                let updated;
                if (this.info_user.first_name != this.first_name || this.info_user.last_name != this.last_name) {
                    if (this.info_user.first_name != this.first_name && this.info_user.last_name == this.last_name) {
                        updated = 'first name'
                    } else if (this.info_user.first_name == this.first_name && this.info_user.last_name != this.last_name) {
                        updated = 'last name'
                    } else if (this.info_user.first_name != this.first_name && this.info_user.last_name != this.last_name) {
                        updated = 'first/last name'
                    }
                    const response = await axios.post(`/auth/update-name-user/${this.info_user.id}`, {
                        first_name: this.first_name, last_name: this.last_name
                    });
                    //console.log(response.data);
                    if (response.data.status) {
                        this.password = '';
                        this.alert_message_type = 'success';
                        this.alert_message = "Success! your " + updated + " has updated successfuly";
                    }
                    this.infoAdmin();
                }
            } catch (err) {
                console.log(err.message)
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
    },
}
</script>

<template>
    <div class="card">
        <h2>Update personal info</h2>
        <p>You can change your first and last name as often as you like!</p>
        <form action="#">
            <div v-if="alert_message_type !== ''"
                :class="{ 'error-message': alert_message_type == 'error', 'success-message': alert_message_type == 'success' }"
                id="message">
                <i class="ri-alert-line"></i>
                <p>{{ alert_message }}</p>
            </div>
            <div class="form-group">
                <label for="first_name">First name</label>
                <input type="text" v-model="first_name" id="first_name">
            </div>
            <div class="form-group">
                <label for="last_name">Last name</label>
                <input type="text" v-model="last_name" id="last_name">
            </div>
            <div class="form-group">
                <label for="password">Enter the password to confirm</label>
                <input type="password" v-model="password" id="password">
            </div>
            <div class="form-group">
                <button @click.prevent="updateName">save</button>
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