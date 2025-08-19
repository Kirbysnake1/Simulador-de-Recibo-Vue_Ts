<template>
    <h3>Añadir nueva transaccion</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Texto *</label>
            <input type="text" id="text" v-model="text" placeholder="Agregar texto..."/>
        </div>
        <div class="form-control">
            <label for="amount">Monto *<br />
                (Negativo - Caro, Positivo - Ingreso)
                </label>
            <input type="text" id="amount" v-model="amount" placeholder="Agregar Monto"/>
        </div>
        <button class="btn">Añadir transaccion</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const text = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted']);

const toast = useToast();

    const onSubmit = () => {
        if (!text.value) {
            toast.error("Campo de Texto no debe estar vacio")
            
            return;
        } else if (!amount.value) {
            toast.error("Campo de Monto no debe estar vacio");
            return;
        } else if (amount.value === '0') {
            toast.error("El monto no puede ser 0");
            return;
        } else if (isNaN(amount.value)) {
            toast.error("El monto debe ser un número");
            return;
        }

        const transactionData = {
            text: text.value,
            amount: parseFloat(amount.value),
        }

        emit('transactionSubmitted', transactionData);
        
        text.value = '';
        amount.value = '';
    }


</script>