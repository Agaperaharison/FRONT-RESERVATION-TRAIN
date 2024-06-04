<script>
export default {
    data() {
        return {
            info_user: [],
            id: '',
            current_password: '',
            new_password: '',
            cpassword: '',
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
        async updatePassword() {
            try {
                const verify = await this.verifyPassword(this.id, this.current_password);
                if (!verify) {
                    this.current_password = '';
                    this.new_password = '';
                    this.cpassword = '';
                    this.alert_message_type = 'error';
                    this.alert_message = "Incorrect password !";
                    return
                }
                if (this.current_password != this.new_password) {
                    const verifyPassword = this.verifyPasswordN();

                    if (verifyPassword.status) {
                        const response = await axios.post(`/auth/update-password-user/${this.id}`, {
                            password: this.new_password
                        });
                        if (response.data.status) {
                            this.current_password = '';
                            this.new_password = '';
                            this.cpassword = '';
                            this.alert_message_type = 'success';
                            this.alert_message = "Success! your domicile address has updated successfuly";
                        }
                    } else {
                        this.current_password = '';
                        this.new_password = '';
                        this.cpassword = '';
                        this.alert_message_type = 'error';
                        this.alert_message = verifyPassword.message;
                    }
                }else{
                        this.current_password = '';
                        this.new_password = '';
                        this.cpassword = '';
                        this.alert_message_type = 'error';
                        this.alert_message = "You cannot use the old password!";
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        verifyPasswordN() {
            if (this.new_password.length < 8) {
                const res = {
                    status: false,
                    message: "The passwords is invalid"
                };
                return res
            } else if (this.new_password !== this.cpassword) {
                const res = {
                    status: false,
                    message: "Passwords do not match"
                };
                return res
            } else {
                const res = {
                    status: true,
                    message: "Password accepted"
                };
                return res
            }
        },
    },
}
</script>

<template>
    <div class="card">
        <h2>Update personal info</h2>
        <p>You can change your password as often as you like!</p>
        <form action="#">
            <div v-if="alert_message_type !== ''"
                :class="{ 'error-message': alert_message_type == 'error', 'success-message': alert_message_type == 'success' }"
                id="message">
                <i class="ri-alert-line"></i>
                <p>{{ alert_message }}</p>
            </div>
            <div class="form-group">
                <label for="current_password">Enter your current password</label>
                <input type="password" v-model="current_password" id="current_password">
            </div>
            <div class="form-group">
                <label for="last_name">New password</label>
                <input type="password" v-model="new_password" id="new_password">
            </div>
            <div class="form-group">
                <label for="cpassword">Repete the new password</label>
                <input type="password" v-model="cpassword" id="cpassword">
            </div>
            <div class="form-group">
                <button @click.prevent="updatePassword">save</button>
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