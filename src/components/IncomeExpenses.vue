<template>
    <div class="inc-exp-container">
        <div>
            <h4>Ingresos</h4>
                <p id="money-plus" class="money plus">+${{ income }}</p>
            
        </div>
        <div>
            <h4>Gastos</h4>
            <p id="money-minus" class="money minus">${{ expense }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  }
});

console.log('✅ Ingreso recibido en componente:', props.income);
</script>


