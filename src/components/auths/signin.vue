<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    mounted() {
        this.verifySession();
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
        async login() {
            try {
                const response = await axios.post('/auth/login', {
                    email: this.email, password: this.password
                }, { withCredentials: true });
                if (response.data.status && response.data.data.role === "ADMIN") {
                    this.$router.push('/admin-page/dashboard');
                    this.email = '';
                } else {
                    this.password = '';
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        async verifySession() {
            try {
                const response = await axios.get('/auth/verify-session-admin', { withCredentials: true, });
                console.log(response.data)
                if (response.data.status && response.data.data.role === "ADMIN") {
                    this.$router.push('/admin-page/dashboard');
                } else {
                    this.$router.push('/');
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    }
} 
</script>

<template>
    <div class="container">
        <div class="main">
            <div class="header">
                <h2>Sign In</h2>
                <p>Contact us and get more info</p>
            </div>
            <div class="contactus">
                <form>
                    <div class="user-box">
                        <input type="email" v-model="email" required>
                        <label for="email">Enter your address email</label>
                    </div>
                    <div class="user-box">
                        <input type="password" v-model="password" required>
                        <label for="password">Enter your password</label>
                    </div>
                    <div class="form-group">
                        <a href="#">Forgot password?</a>
                        <router-link to="/sign-up">sign up</router-link>
                    </div>
                    <center><button @click.prevent="login">submit</button></center>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-image: url("../../assets/imgs/pexels-mtcd-5588646.jpg");
    background-position: center;
    background-size: cover;
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    justify-content: center;
    align-content: center;
}

.main {
    width: 400px;
    border: 1px solid #000;
    padding: 30px;
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 8px 32px 0 rgba(3, 38, 135, 0.37);
    backdrop-filter: blur(3.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.header {
    text-align: center;
    margin-bottom: 3rem;
}

.header h2 {
    color: var(--color-white);
    font-size: 3rem;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 10px;
}

.header p {
    color: var(--color-white);
    font-size: 14px;
}

form .user-box {
    position: relative;
    margin-top: 35px;
}

form .user-box input {
    width: 100%;
    padding: .8rem 1rem;
    color: var(--color-white);
    background: transparent;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-white);
    border-radius: 8px;
    border: 1px solid var(--color-info-dark);
}

form .user-box input:focus {
    border: 1px solid var(--color-white);
}

form .user-box label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.2rem;
    color: var(--color-white);
    pointer-events: none;
    transition: all .5s ease;
}

form .user-box input:focus~label,
form .user-box input:valid~label {
    top: -23px;
    left: 0rem;
    color: var(--color-white);
    font-size: 14px;
    font-weight: bold;
}

.form-group {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}

a {
    font-size: 1.2rem;
    color: var(--color-info-dark);
    font-weight: 500;
    transition: .3s ease;
}

a:hover {
    color: var(--color-white);
}

button {
    height: 40px;
    width: 100%;
    margin-top: 15px;
    border-radius: 7px;
    cursor: pointer;
    background: #3287FC;
    font-weight: bold;
    font-size: 16px;
    color: white;
    border: none;
    transition: all .5s ease-in-out;
}

button:hover {
    background: #3287cc;
}
</style>