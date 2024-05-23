<script>

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="avatar">
                <img src="../../../assets/imgs/pexels-mtcd-5588646.jpg" alt="">
            </div>
            <div class="activity">
                <div class="info-activity">
                    <h3>Old</h3>
                    <h2>21</h2>
                </div>
                <div class="info-activity">
                    <h3>Tâches</h3>
                    <h2>621</h2>
                </div>
                <div class="info-activity">
                    <h3>Mattricule</h3>
                    <h2>EP-1658</h2>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h3>Joshué Agapé</h3>
            <p>joshueagape@gmail.com</p>
        </div>
        <div class="card-footer">
            <button>Message</button>
            <button>More info</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    padding: 1.2rem;
    background: var(--color-white);
    border: 1px solid var(--color-white);
    border-radius: var(--border-radius-3);
    transition: all .3s ease;
    box-shadow: var(--box-shadow);
    transition: all .3s ease;
}

.card:hover {
    box-shadow: none;
    border: 1px solid var(--color-info-dark);
}

.card-header {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.card-header .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}

.card-header .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-header .activity {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    align-items: center;
}

.card-header h3 {
    font-size: 1.06rem;
    color: var(--color-info-dark);
}

.card-body {
    margin: 1rem 0 2rem;
}

.card-body h3 {
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.card-body p {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 1rem;
    letter-spacing: 1px;
    cursor: pointer;
    margin-bottom: 6px;
}
.card-footer {
    display: flex;
    gap: .5rem;
}
button {
    padding: .6rem 1.5rem;
    border-radius: .5rem;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all .3s ease;
}

button:nth-child(1) {
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
    color: #FFF;
}

button:nth-child(1):hover {
    background: #3e4edf;
    border: 1px solid #3e4edf;
}

button:nth-child(2) {
    background: var(--color-white);
    border: 1px solid var(--color-info-dark);
    color: var(--color-info-dark);
}

button:nth-child(2):hover {
    border: 1px solid var(--color-dark);
    color: var(--color-dark);
}
</style>