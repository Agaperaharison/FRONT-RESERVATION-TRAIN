<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            salesArray: [],
            amount: 0,
            paid: 0,
            unpaid: 0,
        }
    },
    mounted() {
        this.getSales();
    },
    methods: {
        async getSales() {
            try {
                const response = await axios.get(`/reservations/get-sales`, { withCredentials: true, });
                this.salesArray = response.data.data;
                const targetDate = this.currentDate;
                const data = this.salesArray.find(sale => this.formattedDate(sale.createdAt) === this.formattedDate(targetDate));
                console.log(data);
                if (data) {
                    this.amount = data.totalAmount;
                    this.paid = data.paidAmount;
                    this.unpaid = data.unpaidAmount;
                } else {
                    this.amount = 0;
                    this.paid = 0;
                    this.unpaid = 0;
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        formattedDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
    },
}
</script>

<template>
    <div class="recettes">
        <h1>The recipe of the day</h1>
        <div class="sales">
            <div class="diddle">
                <div class="left">
                    <div class="entete">
                        <i class="ri-wallet-3-fill" id="paid"></i>
                        <h3 class="success">PAID</h3>
                    </div>
                    <h1>{{ paid.toLocaleString('fr-FR') }} Ar</h1>
                </div>
                <div class="left">
                    <div class="entete">
                        <i class="ri-wallet-3-fill" id="unpaid"></i>
                        <h3 class="warning">UNPAID</h3>
                    </div>
                    <h1>{{ unpaid.toLocaleString('fr-FR') }} Ar</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recettes {
    background: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.recettes:hover {
    box-shadow: none;
}

.recettes h1:nth-child(1) {
    margin-top: 1.6rem;
    margin-left: 2rem;
    color: var(--color-primary);
}

h1:nth-child(2) {
    margin-top: 1rem;
}

.entete {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.sales {
    padding: var(--card-padding);
}

.sales:hover {
    box-shadow: none;
}

i {
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-white);
    font-size: 2rem;
}

#paid {
    background: var(--color-success);
}

#unpaid {
    background: var(--color-warning);
}

.diddle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
}

h3 {
    margin: 1rem 0rem 0.6rem;
    font-size: 1.2rem;
}
</style>