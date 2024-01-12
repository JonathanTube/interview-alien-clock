<script setup>
import { reactive } from 'vue'
import { ALIEN_DAYS_OF_MONTH } from '../js/AlienDate.js'

const emit = defineEmits(['saveSetting'])

const dateTime = reactive({
  year: 2804,
  month: 18,
  day: 31,
  hour: 2,
  minute: 2,
  second: 88
})

const alienMonths = []
for (let i = 1; i <= 18; i++) alienMonths.push(i)

const alienDaysOfMonth = ALIEN_DAYS_OF_MONTH.map((item) => {
  let days = []
  for (let i = 1; i <= item; i++) days.push(i)
  return {
    days
  }
})

const hours = []
for (let i = 0; i < 36; i++) hours.push(i)

const minutes = []
for (let i = 0; i < 90; i++) minutes.push(i)

const seconds = []
for (let i = 0; i < 90; i++) seconds.push(i)

const changeMonth = () => {
  dateTime.day = 1
}

const clickButton = () => {
  emit('saveSetting', dateTime)
}
</script>

<template>
  <div class="setting">
    <div>
      <div>Year:</div>
      <input v-model="dateTime.year" type="number" :min="2804" />
    </div>
    <div />
    <div>
      <div>Month:</div>
      <select v-model="dateTime.month" @change="changeMonth">
        <option v-for="(month, index) in alienMonths" :key="index" :value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <div />
    <div>
      <div>Day:</div>
      <select v-model="dateTime.day" v-if="alienDaysOfMonth[dateTime.month - 1]">
        <option
          v-for="(item, index) in alienDaysOfMonth[dateTime.month - 1].days"
          :key="index"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
    </div>
    <div />
    <div>
      <div>Hour:</div>
      <select v-model="dateTime.hour">
        <option v-for="(item, index) in hours" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div />
    <div>
      <div>Minute:</div>
      <select v-model="dateTime.minute">
        <option v-for="(item, index) in minutes" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div />
    <div>
      <div>Second:</div>
      <select v-model="dateTime.second">
        <option v-for="(item, index) in seconds" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
  <button @click="clickButton">SAVE NEW DATE</button>
</template>

<style scoped>
.setting {
  color: #000;
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr 1fr;
}

input {
  width: 100%;
  height: 30px;
  cursor: pointer;
}
select {
  width: 100%;
  height: 30px;
  cursor: pointer;
}

button {
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .setting {
    color: #fff;
  }
}
</style>
