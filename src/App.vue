<template>
    <Header />
    <div class="container">
        <Balance :total="total" />
        <IncomeExpenses :income="+income" :expense="-expense" />
        <TransactionList :transactions="transactions"
         @transactionDeleted="handleTransactionDeleted" />
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />

    </div>
</template>
<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';

import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { useToast } from 'vue-toastification';

const toast = useToast();

import { ref, computed } from 'vue';
// Se declara un array de transacciones (NO reactivo en este caso)
// Cada objeto representa una transacción con: id, descripción (text), y monto (amount)
// Los montos positivos representan ingresos, los negativos egresos
const transactions = ref([]);

// get total
const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);
});

// get income
const income = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0)
        .toFixed(2);
});

// get expenses
const expense = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0)
        .toFixed(2);
});

// ADD Transaction 

const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
        id: generateUniquedId(),
        text: transactionData.text,
        amount: transactionData.amount
    });

    if (transactionData.amount < 0) {
        toast.error("Transacción de egreso añadida correctamente", {
            style: {
                backgroundColor: "#ff9800", // Naranja brillante
                color: "white"
            },
                position: "top-left",
                timeout: 2000
            
        });

    } else {
        toast.success("Transacción de ingreso añadida correctamente", {
            style: {
                backgroundColor: '#28a745',
                color: '#fff',
            },
            position: "top-left",
            timeout: 2000,
        });
    }

    console.log(generateUniquedId());
};


// DELETE Transaction
    const handleTransactionDeleted = (id) => {
        transactions.value = transactions.value.filter(
            (transaction) => transaction.id !== id
        );

            toast.error("Transacción eliminada correctamente", {
                style: {
                    backgroundColor: "#f44336", // Rojo brillante
                    color: "white"
                },
                position: "top-left",
                timeout: 2000
            });
    }

//generate unique id
const generateUniquedId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8) * 3;
};

</script>
