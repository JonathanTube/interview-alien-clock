<script setup>
import ClockItem from './ClockItem.vue'
import ItemSpliter from './ItemSpliter.vue'
import { computed } from 'vue'

let props = defineProps({
  title: {
    type: String,
    default: 'A Clock',
    required: false
  },

  dateTime: {
    type: Object,
    required: true,
    default: () => {
      return {
        year: null,
        month: null,
        day: null,
        hour: null,
        minute: null,
        second: null
      }
    }
  }
})

const fDateTime = computed(() => {
  let { year, month, day, hour, minute, second } = props.dateTime
  return {
    year,
    month: month == null ? month : new String(month).padStart(2, '0'),
    day: day == null ? day : new String(day).padStart(2, '0'),
    hour: hour == null ? hour : new String(hour).padStart(2, '0'),
    minute: minute == null ? minute : new String(minute).padStart(2, '0'),
    second: second == null ? second : new String(second).padStart(2, '0')
  }
})
</script>

<template>
  <div class="clock">
    <h1>{{ title }}</h1>
    <div class="clock-items">
      <ClockItem :value="fDateTime.year" />
      <ItemSpliter value="-" />
      <ClockItem :value="fDateTime.month" />
      <ItemSpliter value="-" />
      <ClockItem :value="fDateTime.day" />
      <ItemSpliter />
      <ClockItem :value="fDateTime.hour" />
      <ItemSpliter value=":" />
      <ClockItem :value="fDateTime.minute" />
      <ItemSpliter value=":" />
      <ClockItem :value="fDateTime.second" />
    </div>
  </div>
</template>

<style scoped>
.clock {
  text-align: center;
  color: #000;
  font-size: 2rem;
  padding: 40px 0;
}

@media (prefers-color-scheme: dark) {
  .clock {
    color: #fff;
  }
}

.clock .h1 {
  color: #fff;
}

.clock-items {
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr;
}
</style>
