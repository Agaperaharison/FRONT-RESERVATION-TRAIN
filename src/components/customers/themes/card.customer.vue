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
                    <h3>Post</h3>
                    <h2>21</h2>
                </div>
                <div class="info-activity">
                    <h3>Followers</h3>
                    <h2>621</h2>
                </div>
                <div class="info-activity">
                    <h3>Following</h3>
                    <h2>210</h2>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h3>Joshué Agapé</h3>
            <p>joshueagape@gmail.com</p>
            <div class="link-social">
                <a href="#">
                    <i class="ri-facebook-circle-line"></i>
                </a>
                <a href="#">
                    <i class="ri-instagram-line"></i>
                </a>
                <a href="#">
                    <i class="ri-linkedin-fill"></i>
                </a>
                <a href="#">
                    <i class="ri-skype-fill"></i>
                </a>
                <a href="#">
                    <i class="ri-whatsapp-line"></i>
                </a>
            </div>
        </div>
        <!-- <div class="card-body">
            <h3>About</h3>
            <p><span>Domicile : </span> <span>LOT EO73/3702 AMBALAPAISO</span></p>
            <p><span>Habite à : </span> <span>FIANARANTSOA</span></p>
            <p><span>Contact : </span> <span>+261 34 35 626 26</span></p>
            <p><span>Sexe : </span> <span>Homme</span></p>
        </div>
        <div class="card-body">
            <h3>Compte</h3>
            <p><span>Is validate : </span> <span>true</span></p>
            <p><span>Have a debs : </span> <span>false</span></p>
            <p><span>Created at : </span> <span>21 May 2024</span></p>
        </div> -->

        <div class="card-footer">
            <div class="actions">
                <button>Message</button>
                <button>More info</button>
            </div>
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
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.card-header h3 {
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
    font-size: 1rem;
    letter-spacing: 1px;
    cursor: pointer;
}

.card-body p:hover {
    color: var(--color-dark);
}

.link-social {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1.5rem 1rem 0;
}

.link-social a i {
    font-size: 1.6rem;
    color: var(--color-info-dark);
}

.link-social a:hover i {
    color: var(--color-primary);
}

.dark-theme-variables .link-social a:hover i {
    color: var(--color-dark);
}

.card-footer .actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

button {
    padding: .6rem 1rem;
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