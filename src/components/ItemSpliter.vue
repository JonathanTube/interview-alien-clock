<script setup>
defineProps({
  value: {
    type: String,
    required: false,
    default: ' '
  }
})
</script>

<template>
  <div class="item-spliter">{{ value }}</div>
</template>

<style scoped>
.item-spliter {
  color: #fff;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  .item-spliter {
    color: #fff;
    background-color: #181818;
  }
}
</style>
