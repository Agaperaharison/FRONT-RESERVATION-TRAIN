<script>
export default {
    data() {
        return {
            complete_name: '',
            phone_number: '',
            domicile: '',
            nationality: '',
            email: '',
            sexe: ''
        }
    },
    mounted() {
        this.infoAdmin()
    },
    methods: {
        async infoAdmin() {
            try {
                const response = await axios.get(`/auth/get-info-admin`, { withCredentials: true });
                this.complete_name = response.data.data.first_name + ' ' + response.data.data.last_name;
                this.email = response.data.data.email;
                this.sexe = response.data.data.sexe;
                this.phone_number = response.data.data.phone_number;
                this.domicile = response.data.data.address + ' ' + response.data.data.city + ' ' + response.data.data.postal_code;
                this.nationality = response.data.data.nationality;
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
    <div class="container-profil">
        <div class="profil-avatar">
            <div class="avatar">
                <img src="../../../assets/imgs/1869679.png" alt="">
            </div>
        </div>
        <div class="info">
            <i class="ri-shield-keyhole-line lock"></i>
            <h2>{{ complete_name }}</h2>
            <h3>
                <i class="ri-mail-line"></i>
                <span>{{ email }}</span>
            </h3>
            <h3>
                <i class="ri-phone-line"></i>
                <span>{{ phone_number }}</span>
            </h3>
            <h3>
                <i class="ri-road-map-line"></i>
                <span>{{ domicile }}</span>
            </h3>
            <h3>
                <i class="ri-question-mark"></i>
                <span>Nationality : {{ nationality }}</span>
            </h3>
            <h3>
                <i class="ri-women-line"></i>
                <span>Civility : {{ sexe }}</span>
            </h3>
        </div>
    </div>
</template>

<style scoped>
.container-profil {
    background: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    display: grid;
    grid-template-columns: 10rem auto;
    gap: 1.8rem;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.container-profil:hover {
    box-shadow: none;
}

.profil-avatar {
    border: 1px dashed var(--color-light);
}

.info {
    position: relative;
}

.lock {
    position: absolute;
    font-size: 3rem;
    color: var(--color-info-light);
    top: -1rem;
    right: -1rem;
}

.dark-theme-variables .lock {
    opacity: .2;
}

.info h2 {
    color: var(--color-dark);
    margin-bottom: 15px;
}

.info h3 {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    gap: 10px;
    color: var(--color-info-dark);
    font-size: 1rem;
}

.info h3 i {
    font-size: 1.1rem;
}
</style>