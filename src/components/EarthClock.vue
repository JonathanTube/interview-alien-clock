<script setup>
import CommonClock from './CommonClock.vue'
import { reactive, onMounted, onUnmounted } from 'vue'

let d = new Date(new Date().getTime())

const dateTime = reactive({
  year: null,
  month: null,
  day: null,
  hour: null,
  minute: null,
  second: null
})

let earthTimeInterval = null

onMounted(() => {
  earthTimeInterval = setInterval(() => {
    setTimeout(() => {
      d = new Date(d.getTime() + 1000)
      dateTime.year = d.getFullYear()
      dateTime.month = d.getMonth() + 1
      dateTime.day = d.getDate()
      dateTime.hour = d.getHours()
      dateTime.minute = d.getMinutes()
      dateTime.second = d.getSeconds()
    }, 0)
  }, 1000)
})

onUnmounted(() => {
  if (earthTimeInterval != null) {
    clearInterval(earthTimeInterval)
    earthTimeInterval = null
  }
})

defineExpose({
  setEarthTime(seconds) {
    d = new Date(seconds * 1000)
  }
})
</script>

<template>
  <CommonClock title="Earth Clock" :dateTime="dateTime" />
</template>
