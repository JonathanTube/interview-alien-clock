<script setup>
import AlienClock from './components/AlienClock.vue'
import EarthClock from './components/EarthClock.vue'
import { ref } from 'vue'

const earthClock = ref(null)

const saveEarthDateTime = (earthTimeSeconds) => {
  earthClock.value.setEarthTime(earthTimeSeconds)
}
</script>

<template>
  <main>
    <AlienClock @save-earth-date-time="saveEarthDateTime" />
    <hr />
    <EarthClock ref="earthClock" />
  </main>
</template>

<style scoped></style>
