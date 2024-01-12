<script setup>
import CommonClock from './CommonClock.vue'
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import AlienDate from '../js/AlienDate.js'
import AlienClockSetting from './AlienClockSetting.vue'
import AlienClockAlarm from './AlienClockAlarm.vue'

const alarmDateTime = ref({})

const emit = defineEmits(['saveEarthDateTime', 'saveAlarm'])

// build the seconds of alien's date and time.
let alienDate = new AlienDate()
let earthDateTimeSeconds = new Date().getTime() / 1000
let alienDateTimeSeconds = Math.floor(earthDateTimeSeconds * 2)
alienDate.initFromTimeSeconds(alienDateTimeSeconds)

const dateTime = reactive({
  year: null,
  month: null,
  day: null,
  hour: null,
  minute: null,
  second: null
})

/**
 * initialize the alien's date and time according to the earth date and time.
 */
const handleAlienDateTime = () => {
  dateTime.year = alienDate.getYear()
  dateTime.month = alienDate.getMonth()
  dateTime.day = alienDate.getDay()
  dateTime.hour = alienDate.getHour()
  dateTime.minute = alienDate.getMinute()
  dateTime.second = alienDate.getSecond()
}

let alienTimeInterval = null

onMounted(() => {
  handleAlienDateTime()
  alienTimeInterval = setInterval(() => {
    setTimeout(() => {
      alienDateTimeSeconds += 1
      alienDate.initFromTimeSeconds(alienDateTimeSeconds)
      handleAlienDateTime()
      doAlarm()
    }, 0)
  }, 1000 * 0.5)
})

const doAlarm = () => {
  if (!alarmDateTime.value) return
  if (
    alarmDateTime.value.year === dateTime.year &&
    alarmDateTime.value.month === dateTime.month &&
    alarmDateTime.value.day === dateTime.day &&
    alarmDateTime.value.hour === dateTime.hour &&
    alarmDateTime.value.minute === dateTime.minute &&
    alarmDateTime.value.second === dateTime.second
  ) {
    alert('Ding Ding Ding, Time is up!')
  }
}

onUnmounted(() => {
  if (alienTimeInterval != null) {
    clearInterval(alienTimeInterval)
    alienTimeInterval = null
  }
})

const saveSetting = (dateTime) => {
  try {
    let { year, month, day, hour, minute, second } = dateTime
    alienDateTimeSeconds = alienDate.setDateTime(year, month, day, hour, minute, second)
    // convert alien time seconds to earth time seconds
    let earthDateTimeSeconds = Math.floor(alienDateTimeSeconds / 2)
    emit('saveEarthDateTime', earthDateTimeSeconds)
  } catch (error) {
    alert(error)
  }
}

const saveAlarm = (dateTime) => {
  alarmDateTime.value = dateTime
}
</script>

<template>
  <CommonClock title="Alien Clock" :dateTime="dateTime" />
  <hr />
  <AlienClockSetting @save-setting="saveSetting" />
  <hr />
  <div class="next-alarm" v-if="alarmDateTime.year">
    <span>Next Alarm:</span>
    {{ alarmDateTime.year }}-{{ alarmDateTime.month }}-{{ alarmDateTime.day }}
    {{ alarmDateTime.hour }}:{{ alarmDateTime.minute }}:{{ alarmDateTime.second }}
  </div>
  <AlienClockAlarm @save-alarm="saveAlarm" />
</template>

<style scoped>
.next-alarm {
  text-align: center;
  font-size: 2rem;
  color: #000;
}
@media (prefers-color-scheme: dark) {
  .next-alarm {
    color: #fff;
  }
}
</style>
