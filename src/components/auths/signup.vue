<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cpassword: '',
            sexe: '',
            nationality: '',
            socket: null
        }
    },
    created() {
        this.socket = io('http://localhost:8081');
        this.socket.on('connect_error', error => {
            console.error('Socket.io connection error:', error);
        });
    },
    beforeDestroy() {
        this.socket.close();
    },
    mounted(){
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
        async signUp() {
            try {
                const verifyPassword = this.verifyPassword();
                if (verifyPassword.status) {
                    const response = await axios.post('/auth/sign-up', {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        password: this.password,
                        sexe: this.sexe,
                        title: this.sexe === "homme" ? 'Mr' : 'Mm/Mll',
                    });
                    if (response.data.status) {
                        this.first_name = '';
                        this.last_name = '';
                        this.email = '';
                        this.password = '';
                        this.socket.emit('inscription');
                        this.$router.push('/');
                    }
                } else {
                    this.fireToast('ERROR!', verifyPassword.message, 'error', 'ok');
                }
            } catch (err) {
                console.log(err.message)
            }
        },
        verifyPassword() {
            if (this.password.length < 8) {
                const res = {
                    status: false,
                    message: "The passwords is invalid"
                };
                return res
            } else if (this.password !== this.cpassword) {
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
        async verifySession() {
            try {
                const response = await axios.get('/auth/verify-session-admin', { withCredentials: true, });
                console.log(response.data)
                if (response.data.status && response.data.data.role==="ADMIN") {
                    this.$router.push('/admin-page/dashboard');
                } else {
                    this.$router.push('/sign-up');
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
                <h2>Sign Up</h2>
                <p>Contact us and get more info</p>
            </div>
            <div class="contactus">
                <form action="#">
                    <div class="form-group1">
                        <p for="">Choose in option your sexe</p>
                        <select v-model="sexe">
                            <option value="" disabled selected>choose</option>
                            <option value="homme">Man</option>
                            <option value="femme">Woman</option>
                        </select>
                    </div>
                    <div class="user-box">
                        <input type="text" v-model="first_name" required>
                        <label>Enter your first name</label>
                    </div>
                    <div class="user-box">
                        <input type="text" v-model="last_name" required>
                        <label>Enter your last name</label>
                    </div>
                    <!-- <div class="user-box">
                        <input type="text" v-model="nationality" required>
                        <label>Nationality</label>
                    </div> -->
                    <div class="user-box">
                        <input type="email" v-model="email" required>
                        <label>Enter your email address</label>
                    </div>
                    <div class="user-box">
                        <input type="password" v-model="password" required>
                        <label>Enter your password</label>
                    </div>
                    <div class="user-box">
                        <input type="password" v-model="cpassword" required>
                        <label>Rewrite your password</label>
                    </div>
                    <div class="form-group">
                        <a href="">Are you need a help?</a>
                        <router-link to="/">sign in</router-link>
                    </div>
                    <center><button @click.prevent="signUp">submit</button></center>
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
    margin-bottom: 2rem;
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

p {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--color-white);
}

select {
    padding: 8px 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    width: 100%;
    background: transparent;
    color: var(--color-white);
    border: 1px solid var(--color-info-dark);
    border-radius: 7px;
}
option {
    color: var(--color-dark);
    font-weight: 600;
    font-size: 1.1rem;
}

form .user-box {
    position: relative;
    margin-top: 35px;
    width: 100%;
}

form .user-box:last-child {
    padding-bottom: 1rem;
}

form .user-box input {
    width: 100%;
    padding: .8rem 1rem;
    color: var(--color-white);
    background: transparent;
    font-size: 1.1rem;
    font-weight: 600;
    border: 1px solid var(--color-info-dark);
    border-radius: 8px;
}

form .user-box input:focus {
    border: 2px solid var(--color-white);
}

form .user-box label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.2rem;
    color: var(--color-info-dark);
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

.form-group1 {
    display: grid;
    grid-template-columns: auto 8rem;
    align-items: center;
    gap: 1rem;
}

.form-group {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    margin-top: 1rem;
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