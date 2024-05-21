<script>

</script>

<template>
    <nav>
        <ul>
            <li class="active">
                <span>All</span>
                <span>5</span>
            </li>
            <li>
                <span>Recent</span>
                <span>5</span>
            </li>
            <li>
                <span>Have a debs</span>
                <span>5</span>
            </li>
            <li>
                <span>Is validate</span>
                <span>5</span>
            </li>
            <li>
                <span>Is not validate</span>
                <span>5</span>
            </li>
            <li>
                <span>Femme</span>
                <span>5</span>
            </li>
            <li>
                <span>Homme</span>
                <span>5</span>
            </li>
        </ul>
        <div class="count">
            <span>COUNT : </span>
            <span>34</span>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: .7rem;
}

nav ul {
    display: flex;
    gap: .5rem;
    height: 28px;
}

nav ul li {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-info-dark);
    height: 100%;
    padding: 0 1.2rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all .3s ease;
}

nav ul li:hover,
nav ul li.active {
    background: var(--color-nav);
    color: var(--color-primary-variant);
}

nav .count {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.3rem;
    margin-right: 1rem;
}

nav .count span:nth-child(1) {
    text-decoration: underline;
    font-weight: bold;
    color: var(--color-info-dark);
}

nav .count span:nth-child(2) {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-dark);
}
</style>