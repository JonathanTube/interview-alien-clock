<script setup>
defineProps({
  value: null
})
</script>

<template>
  <div class="clock-item">
    {{ value || '...' }}
  </div>
</template>

<style scoped>
.clock-item {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #fff;
  background-color: #000;
  font-size: 2rem;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), #000);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@media (prefers-color-scheme: dark) {
  .clock-item {
    color: #000;
    background: #fff;
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.5);
  }
}
</style>
