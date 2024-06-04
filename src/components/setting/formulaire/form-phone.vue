<script>

</script>

<template>
    <div class="card">
        <h2>Update personal info</h2>
        <p>You can change your phone number as often as you like!</p>
        <form action="#">
            <div class="message error-message">
                <i class="ri-alert-line"></i>
                <p>Incorrect password !</p>
            </div>
            <div class="message success-message">
                <i class="ri-check-fill"></i>
                <p>Success! your phone number has updated successfuly</p>
            </div>
            <div class="form-group">
                <label for="phone">Phone number</label>
                <input type="text" name="phone" id="phone">
            </div>
            <div class="form-group">
                <label for="password">Enter the password to confirm</label>
                <input type="password" name="password" id="password">
            </div>
            <div class="form-group">
                <button>save</button>
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