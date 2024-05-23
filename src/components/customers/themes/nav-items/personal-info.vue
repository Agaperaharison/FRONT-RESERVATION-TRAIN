<script>

</script>

<template>
    <h1>Basic information</h1>
    <div class="basic">
        <div class="basic-item">
            <h4>First name</h4>
            <h3>RAHARISON</h3>
        </div>
        <div class="basic-item">
            <h4>Last name</h4>
            <h3>Joshué Agapé</h3>
        </div>
        <div class="basic-item">
            <h4>Title</h4>
            <h3>Mr</h3>
        </div>
        <div class="basic-item">
            <h4>Date of birth</h4>
            <h3>10/10/2001</h3>
        </div>
        <div class="basic-item">
            <h4>Phone number</h4>
            <h3>+261 34 35 626 26</h3>
        </div>
        <div class="basic-item">
            <h4>Email</h4>
            <h3>joshueagape@gmail.com</h3>
        </div>
    </div>
    <h1>Address</h1>
    <div class="basic">
        <div class="basic-item">
            <h4>Address</h4>
            <h3>Lot EO73/3702</h3>
        </div>
        <div class="basic-item">
            <h4>Address field</h4>
            <h3>Ambalapaiso</h3>
        </div>
        <div class="basic-item">
            <h4>Contry</h4>
            <h3>Fianarantsoa</h3>
        </div>
        <div class="basic-item">
            <h4>Postal code</h4>
            <h3>301</h3>
        </div>
    </div>
</template>

<style scoped>
.basic {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.8rem;
    margin-bottom: 2.5rem;
}

.basic-item h4 {
    font-size: 1.1rem;
    color: var(--color-info-dark);
    margin-bottom: 4px;
}

.basic-item h3 {
    font-size: 1.2rem;
    color: var(--color-dark);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--color-info-dark);
    transition: all .1s ease;
}
</style>>