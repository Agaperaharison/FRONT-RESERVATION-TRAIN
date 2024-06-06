<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            date_value: new Date().toISOString().substr(0, 10),
            salesArray: [],
            graphValue: [],
            items: 0
        }
    },
    mounted() {
        this.getSales();
    },
    methods: {
        async getSales() {
            try {
                const targetDate = this.date_value ? new Date(this.date_value) : this.currentDate;
                const response = await axios.get(`/reservations/get-sales`, { withCredentials: true, });
                this.salesArray = response.data.data;
                this.salesArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const lastItems = this.salesArray.filter(item => new Date(item.createdAt) <= targetDate).slice(0, 30);
                this.graphValue = lastItems;
                this.items = 30 - lastItems.length;
                const highestTotalAmount = lastItems.reduce((maxTotalAmount, currentItem) => {
                    return Math.max(maxTotalAmount, currentItem.totalAmount);
                }, 0);
                this.maxAmount = highestTotalAmount;
                console.log(this.graphValue);
                console.log(this.maxAmount);
                console.log(this.items);
            } catch (err) {
                console.log(err.message);
            }
        },
        filterAndCalculateTotal() {
            const targetDate = this.date_value ? new Date(this.date_value) : this.currentDate;
            this.salesArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const lastItems = this.salesArray.filter(item => new Date(item.createdAt) <= targetDate).slice(0, 30);
            this.graphValue = lastItems;
            const highestTotalAmount = lastItems.reduce((maxTotalAmount, currentItem) => {
                return Math.max(maxTotalAmount, currentItem.totalAmount);
            }, 0);
            this.maxAmount = highestTotalAmount;
            console.log(this.graphValue);
            console.log(this.maxAmount);
        },
    }
}
</script>

<template>
    <div class="charts">
        <div class="head">
            <h2><i class="ri-bar-chart-grouped-fill"></i> Bar chart group</h2>
            <div class="legende">
                <h3>
                    <i class="ri-stop-mini-fill"></i>
                    <span>total amount</span>
                </h3>
                <h3>
                    <i class="ri-stop-mini-fill"></i>
                    <span>total paid</span>
                </h3>
                <h3>
                    <i class="ri-stop-mini-fill"></i>
                    <span>total unpaid</span>
                </h3>
            </div>
        </div>
        <div class="container-chart">
            <!-- CHART DEFAULT VALUE -->
            <div class="chart" v-for="i in items" :key="i">
                <div class="chart-amount cht">
                    <span style="height: 0.1%;"></span>
                </div>
                <div class="chart-paid cht">
                    <span style="height: 0.1%;"></span>
                </div>
                <div class="chart-unpaid cht">
                    <span style="height: 0.1%;"></span>
                </div>
            </div>
            <div class="chart" v-for="Value in graphValue" :key="Value.createdAt">
                <div class="chart-amount cht">
                    <span style="
                    height: 79%;
                    "></span>
                </div>
                <div class="chart-paid cht">
                    <span style="height: 50%;"></span>
                </div>
                <div class="chart-unpaid cht">
                    <span style="height: 21%;"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.charts {
    position: relative;
    padding: 1rem;
    background: var(--color-white);
    border-radius: 1rem;
    box-shadow: var(--box-shadow);
    transition: all .3s ease;
    height: 460px;
    overflow: hidden;
}

.charts:hover {
    box-shadow: none;
}

h2 {
    margin-bottom: 1rem;
}

.legende {
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

h3 {
    display: flex;
    align-items: center;
    gap: 4px;
}

h3:nth-child(1) {
    color: var(--color-primary);
}

h3:nth-child(2) {
    color: var(--color-success);
}

h3:nth-child(3) {
    color: var(--color-warning);
}

.container-chart {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(30, 1fr);
    height: calc(100% - 4rem);
}

.chart {
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
}

.cht {
    position: relative;
    height: 100%;
}

.cht span {
    position: absolute;
    width: 100%;
    bottom: 0;
    border-radius: 50px;
    animation: animate 1s;
}

@keyframes animate {
    0% {
        height: 0;
    }
}

.chart-amount span {
    background: var(--color-primary);
}

.chart-paid span {
    background: var(--color-success);
}

.chart-unpaid span {
    background: var(--color-warning);
}
</style>