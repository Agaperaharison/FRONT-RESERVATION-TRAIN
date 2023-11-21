<script>
export default {
    data() {
        return {
            nationality: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            sexe: 'homme',
            date_of_birth: '',
            domicile: '',
            city: '',
            code: '',
        }
    },
    methods: {
        fireToast(title, message, icon, btn) {
            Toast.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: btn
            });
        },
        async addAgent() {
            try {
                const response = await axios.post('/users/add-new-agent', {
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    sexe: this.sexe,
                    phone_number: this.formaterNumero(this.phone_number),
                    date_of_birth: this.date_of_birth,
                    address: this.domicile,
                    city: this.city,
                    postal_code: this.code,
                    nationality: this.nationality,

                }, { withCredentials: true, });
                console.log(response.data.data)
                if (response.data.status) {
                    this.fireToast("Success", response.data.data.message, 'success', 'ok')
                    this.nationality = ''
                    this.first_name = ''
                    this.last_name = ''
                    this.email = ''
                    this.phone_number = '';
                    this.sexe = this.sexe;
                    this.date_of_birth = '';
                    this.domicile = ''
                    this.city = ''
                    this.code = ''
                } else {
                    this.fireToast("ERROR!", response.data.data.message, 'error', 'ok')
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        formaterNumero(numero) {
            numero = numero.replace(/\D/g, '');
            if (numero.startsWith('0')) {
                numero = numero.slice(1);
                numero = '+261' + numero;
            } else if (!numero.startsWith('+261')) {
                numero = '+261' + numero;
            }
            numero = numero.replace(/(\+\d{3})(\d{2})(\d{2})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5');
            return numero;
        },
        selectOption(option) {
            this.sexe = option
        }

    }
}
</script>

<template>
    <div class="main">
        <div class="container">
            <router-link to="/admin-page/customers/agents" class="return">
                <i class="ri-arrow-left-circle-line"> </i> <span>back</span>
            </router-link>
            <form>
                <h1>ADDITIONAL FORM</h1>
                <div class="form-container">
                    <div class="left">
                        <div class="form-group">
                            <label for="">Nationality</label>
                            <input type="text" v-model="nationality" id="">
                        </div>
                        <div class="form-group">
                            <label for="">First name</label>
                            <input type="text" v-model="first_name" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Last name</label>
                            <input type="text" v-model="last_name" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Address e-mail</label>
                            <input type="text" v-model="email" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Phone number</label>
                            <input type="text" v-model="phone_number" id="">
                        </div>
                    </div>
                    <div class="right">
                        <div class="form-group">
                            <label for="">Sexe</label>
                            <div class="input-radio">
                                <div class="homme">
                                    <p for="homme" id="sexeee" :class="{ selected: this.sexe === 'homme' }"
                                        @click="selectOption('homme')">homme</p>
                                </div>
                                <div class="homme">
                                    <p for="femme" id="sexeee" :class="{ selected: this.sexe === 'femme' }"
                                        @click="selectOption('femme')">femme</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">Date of birth</label>
                            <input type="date" v-model="date_of_birth" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Domicile</label>
                            <input type="text" v-model="domicile" id="">
                        </div>
                        <div class="form-group">
                            <label for="">City</label>
                            <input type="text" v-model="city" id="">
                        </div>
                        <div class="form-group">
                            <label for="">Postal code</label>
                            <input type="number" v-model="code" id="">
                        </div>
                    </div>
                </div>
                <button class="btn-add" @click.prevent="addAgent">save</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.input-radio p {
    font-size: 1.1rem;
}

.container {
    width: 100%;
}

#sexeee.selected {
    background: var(--color-light);
    color: var(--color-primary);
}

#sexeee {
    margin-top: 1rem;
    padding: 3px 1rem;
    border-radius: 50rem;
    font-weight: 600;
}

.return {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

.return:hover {
    color: var(--color-dark);
}

.ri-arrow-left-circle-line {
    font-size: 2rem;
}

span {
    font-size: 1.2rem;
    font-weight: 600;
}

form {
    background: var(--color-white);
    width: 730px;
    padding: 2rem 2.6rem;
    margin-top: 2rem;
    border-radius: 12px;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--color-info-dark);
}

.form-container {
    display: grid;
    gap: 4rem;
    grid-template-columns: repeat(2, 300px);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
}

.form-group label {
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all .3s ease;
}

input[type="text"],
input[type="date"],
input[type="number"] {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 10px 1rem;
    border-radius: 6px;
    border: 1px solid var(--color-info-dark);
    background: var(--color-white);
    color: var(--color-dark);
}

.homme {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-radio input {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 10px 1rem;
}

.input-radio {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.btn-add {
    margin-top: .5rem;
    padding: 10px 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    background: var(--color-light);
    border-radius: 10px;
    width: 150Px;
    color: var(--color-dark);
    transition: all .3s ease;
}

.btn-add:hover {
    background: var(--color-primary);
    color: #fff;
}
</style>