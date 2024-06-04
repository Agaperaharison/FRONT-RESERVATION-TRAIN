<script>
export default {
    data() {
        return {
            info_user: [],
            complete_name: '',
            role: '',
            email: '',
            phone_number: '',
            domicile: '',
            nationality: '',
            createdAt: '',
            _token: '',
            sexe:'',
            date_of_birth: ''
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
                this.complete_name = response.data.data.first_name + ' ' + response.data.data.last_name;
                this.email = response.data.data.email;
                this.role = response.data.data.role;
                this.sexe = response.data.data.sexe;
                this.phone_number = response.data.data.phone_number;
                this.date_of_birth = this.formattedDate(response.data.data.date_of_birth) + ' (' + response.data.data.date_of_birth + ')';;
                this.domicile = response.data.data.address + ' ' + response.data.data.city + ' ' + response.data.data.postal_code;
                this.nationality = response.data.data.nationality;
                this.createdAt = this.formattedDate(response.data.data.createdAt) + ' (' + response.data.data.createdAt + ')';
                this._token = response.data.data._token;
            } catch (err) {
                console.log(err.message);
            }
        },
        formattedDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
    },
}
</script>

<template>
    <div class="card">
        <h2>Your personal Information</h2>
        <p style="margin-bottom: 15px">Tout ce qui est à propos de votre compte affiche ici</p>
        <div class="form-groupG">
            <div>
                <label for="role">Role</label>
                <input type="text" v-model="role" id="role">
            </div>
            <div>
                <label for="sexe">Role</label>
                <input type="text" v-model="sexe" id="sexe">
            </div>
        </div>
        <div class="form-group">
            <label for="complete_name">Complete name</label>
            <input type="text" v-model="complete_name" id="complete_name">
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="text" v-model="email" id="email">
        </div>
        <div class="form-groupM">
            <div>
                <label for="phone_number">Phone number</label>
                <input type="text" v-model="phone_number" id="phone_number">
            </div>
            <div>
                <label for="nationality">Nationality</label>
                <input type="text" v-model="nationality" id="nationality">
            </div>
        </div>
        <div class="form-group">
            <label for="domicile">Complete domicile address</label>
            <input type="text" v-model="domicile" id="domicile">
        </div>
        <div class="form-group">
            <label for="date_of_birth">Date of birth</label>
            <input type="text" v-model="date_of_birth" id="date_of_birth">
        </div>
        <div class="form-group">
            <label for="createdAt">Created at</label>
            <input type="text" v-model="createdAt" id="createdAt">
        </div>
        <div class="form-group">
            <label for="_token">Your connexion token</label>
            <input type="text" v-model="_token" id="_token">
        </div>
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

.form-groupM {
    position: relative;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
}

.form-groupG {
    position: relative;
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 10rem;
}

.form-groupG div {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-groupG input#role {
    width: 100%;
}

.form-groupG input {
    width: 140px;
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