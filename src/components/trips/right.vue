<script>
import tripsInsightVue from './trips.insight.vue'
export default {
    components: {
        tripsInsightVue
    },
    data() {
        return {
            itemNavActive: 'train',
            train_lists: [],
            stations_lists: [],
            count: 0,
            name: '',
        }
    },
    mounted(){
        this.getListsStations();
        this.getListsTrain();
    },
    methods: {
        activeItemNav(itemNav) {
            this.itemNavActive = itemNav
            if(itemNav=='gare'){
                this.getListsStations();
            }else{
                this.getListsTrain();
            }
        },
        async getListsTrain(){
            try{
                const response = await axios.get('/trips/get-all-trains');
                this.train_lists = response.data.data;
                this.count = response.data.data.length
                this.name = 'trains'
            }catch(err){
                console.log(err.message)
            }
        },
        async getListsStations(){
            try{
                const response = await axios.get('/trips/get-all-stations');
                this.stations_lists = response.data.data;
                this.count = response.data.data.length
                this.name = 'stations'
            }catch(err){
                console.log(err.message)
            }
        },
    }
}
</script>

<template>
    <div class="right">
        <div class="div">
            <ul class="nav">
                <li :class="{ active: itemNavActive == 'gare' }" @click="activeItemNav('gare')">
                    <i class="ri-bank-line"></i>
                    <span>Station</span>
                </li>
                <li :class="{ active: itemNavActive == 'train' }" @click="activeItemNav('train')">
                    <i class="ri-train-line"></i>
                    <span>Train</span>
                </li>
            </ul>
            <h3>COUNT : <span>{{ count }} {{ name }}</span></h3>
            <div id="lists" :class="{ show: itemNavActive == 'gare' }">
                <div class="card" v-for="station in stations_lists" :key="station.id">
                    <div class="card-header">
                        <h4 class="card-title">Gare de {{ station.localisation_city }}</h4>
                        <h4 class="card-title">{{ station.localisation_postal_code }}</h4>
                    </div>
                    <div class="card-body">
                        <h4>Localisation</h4>
                        <p>
                            <span>Latitude :</span>
                            <span>{{ station.latitude }}</span>
                        </p>
                        <p>
                            <span>Longitude :</span>
                            <span>{{ station.longitude }}</span>
                        </p>
                    </div>
                </div>
                <!-- <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Gare de FIANARANTSOA</h4>
                        <h4 class="card-title">301</h4>
                    </div>
                    <div class="card-body">
                        <h4>Localisation</h4>
                        <p>
                            <span>Latitude :</span>
                            <span>545545.6656</span>
                        </p>
                        <p>
                            <span>Longitude :</span>
                            <span>545545.6656</span>
                        </p>
                    </div>
                </div> -->
            </div>
            <div id="lists" :class="{ show: itemNavActive == 'train' }">
                <div class="card" v-for="train in train_lists" :key="train.id">
                    <div class="card-header">
                        <h4 class="card-title">{{ train.design }}</h4>
                        <h4 class="card-title">{{ train.train_matricule }}</h4>
                    </div>
                    <div class="card-body">
                        <h4>About</h4>
                        <p>
                            <span>Total siege :</span>
                            <span>{{ train.siege }}</span>
                        </p>
                        <p>
                            <span>Color :</span>
                            <span>{{ train.color }}</span>
                        </p>
                    </div>
                </div>
                <!-- <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">TRAIN TURBO</h4>
                        <h4 class="card-title">FD-0015TR</h4>
                    </div>
                    <div class="card-body">
                        <h4>About</h4>
                        <p>
                            <span>Total siege :</span>
                            <span>545545.6656</span>
                        </p>
                        <p>
                            <span>Color :</span>
                            <span>red-blue-white</span>
                        </p>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.div {
    background: var(--color-white);
    padding: 1rem 1rem 2rem;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: var(--box-shadow);
    transition: all .3s ease;
}

.div:hover {
    box-shadow: none;
}

.nav {
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 60px;
    border: 1px solid var(--color-light);
}

.nav li {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    justify-content: center;
    height: 100%;
    border-radius: 30px;
    cursor: pointer;
    color: var(--color-info-dark);
    border: 1px solid transparent;
    transition: all .3s ease;
}

.nav li.active {
    background: var(--color-primary);
    color: #fff;
    border: 1px solid var(--color-primary);
}

h3 {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-info-dark);
}

h3 span {
    color: var(--color-dark);
}

#lists {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    display: none;
    max-height: 78vh;
    overflow-y: auto;
    padding-right: 1rem;
}

#lists.show {
    display: block;
}

.card {
    margin-top: 1rem;
    width: 100%;
    border: 1px solid var(--color-info-light);
    border-radius: 7px;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    border-bottom: 1px solid var(--color-info-light);
    padding: 0 1rem;
}

.card-title {
    font-size: 1.1rem;
    color: var(--color-dark);
}

.card-body {
    padding: .4rem 1rem;
}

.card-body h4 {
    font-size: 1.2rem;
    color: var(--color-primary-variant);
    margin-bottom: 4px;
    text-decoration: underline;
}

.card-body p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;
    color: var(--color-dark);
}

.card-body p span:nth-child(1) {
    color: var(--color-info-dark);
    font-weight: 600;
}
</style>