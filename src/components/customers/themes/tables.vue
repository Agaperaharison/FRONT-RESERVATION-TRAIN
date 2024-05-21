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
    <div class="table-customers">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Sexe</th>
                    <th>is validate</th>
                    <th>have a debs</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>122</td>
                    <td>Joshué Agapé</td>
                    <td>
                        <div class="avatar">
                            <img src="../../../assets/imgs/1869679.png" alt="">
                        </div>
                    </td>
                    <td>Ambalapaiso Fianarantsoa</td>
                    <td>034 35 626 26</td>
                    <td>homme</td>
                    <td>true</td>
                    <td>true</td>
                    <td class="btn">
                        <button>
                            <span>more info</span>
                            <i class="ri-arrow-right-circle-line"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>122</td>
                    <td>Joshué Agapé</td>
                    <td>
                        <div class="avatar">
                            <img src="../../../assets/imgs/1869679.png" alt="">
                        </div>
                    </td>
                    <td>Ambalapaiso Fianarantsoa</td>
                    <td>034 35 626 26</td>
                    <td>homme</td>
                    <td>true</td>
                    <td>true</td>
                    <td class="btn">
                        <button>
                            <span>more info</span>
                            <i class="ri-arrow-right-circle-line"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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

.table-customers {
    background: var(--color-white);
    margin-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    max-height: 85vh;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
    overflow-y: auto;
}

.table-customers:hover {
    box-shadow: none;
}

table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

thead {
    position: sticky;
    top: 0;
    background: var(--color-white);
}

th {
    font-size: 1.1rem;
    height: 3.2rem;
    background: var(--color-info-dark);
    color: var(--color-white);
}

td {
    height: 3rem;
    padding: 7px 0;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: 500;
}

td:nth-child(2) {
    font-weight: 600;
}

td .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;
}

td img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

tr:last-child td {
    border: none;
}

td.btn {
    height: 100%;
}

button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    height: 100%;
    margin: auto;
    padding: 0 1.2rem;
    border-radius: 7px;
    font-size: 1.1rem;
    font-weight: 600;
    background: var(--color-white);
    color: var(--color-info-dark);
    cursor: pointer;
    transition: all .3s ease;
}

button i {
    font-size: 1.5rem;
}

button:hover {
    color: var(--color-primary);
}
</style>