<script>
export default {
    data() {
        return {
            info_user: [],
            id: '',
            phone_number: '',
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
                this.info_user = response.data.data;
                this.id = response.data.data.id;
                this.phone_number = response.data.data.phone_number;
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
        async updatePhoneNumber() {
            try {
                const verify = await this.verifyPassword(this.id, this.password);
                if (!verify) {
                    this.password = '';
                    this.alert_message_type = 'error';
                    this.alert_message = "Incorrect password !";
                    return
                }
                const response = await axios.post(`/auth/update-phone-number-user/${this.id}`, {
                    phone_number: this.formaterNumero(this.phone_number)
                });
                if (response.data.status) {
                    this.password = '';
                    this.alert_message_type = 'success';
                    this.alert_message = "Success! your phone number has updated successfuly";
                }
                this.infoAdmin();
            } catch (err) {
                console.log(err.message);
            }
        },
        formaterNumero(numero) {
            numero = numero.replace(/\D/g, '');
            if (numero.startsWith('0')) {
                numero = numero.slice(1);
                numero = '+261' + numero;
            } else if (!numero.startsWith('+261')) {
                numero = '+' + numero;
            }
            numero = numero.replace(/(\+\d{3})(\d{2})(\d{2})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5');
            return numero;
        }
    },
}
</script>

<template>
    <div class="card">
        <h2>Update personal info</h2>
        <p>You can change your phone number as often as you like!</p>
        <form action="#">
            <div v-if="alert_message_type !== ''"
                :class="{ 'error-message': alert_message_type == 'error', 'success-message': alert_message_type == 'success' }"
                id="message">
                <i class="ri-alert-line"></i>
                <p>{{ alert_message }}</p>
            </div>
            <div class="form-group">
                <label for="phone">Phone number</label>
                <input type="text" v-model="phone_number" id="phone">
            </div>
            <div class="form-group">
                <label for="password">Enter the password to confirm</label>
                <input type="password" v-model="password" id="password">
            </div>
            <div class="form-group">
                <button @click.prevent="updatePhoneNumber">save</button>
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