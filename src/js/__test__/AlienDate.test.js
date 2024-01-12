import { expect, test } from 'vitest'

import AlienDate, {
  ALIEN_DAYS_OF_MONTH,
  ALIEN_SECONDS_OF_DAY,
  ALIEN_SECONDS_OF_HOUR,
  ALIEN_SECONDS_OF_MINUTE
} from '../AlienDate'

const startYear = 2804

test('test getAdditionalSeconds', () => {
  let alienDate = new AlienDate()
  let remainSeconds = alienDate.getAdditionalSeconds()

  let totalSeconds = 0
  for (let i = 0; i < ALIEN_DAYS_OF_MONTH.length - 1; i++) {
    totalSeconds += ALIEN_DAYS_OF_MONTH[i] * ALIEN_SECONDS_OF_DAY
  }
  totalSeconds += 30 * ALIEN_SECONDS_OF_DAY
  totalSeconds += 2 * 90 * 90
  totalSeconds += 2 * 90
  totalSeconds += 88
  expect(remainSeconds).toBe(totalSeconds)
})

test('test calcYearFromSeconds', () => {
  let alienDate = new AlienDate()

  // total seconds of one year.
  let daysOfYear =
    44 + 42 + 48 + 40 + 48 + 44 + 40 + 44 + 42 + 40 + 40 + 42 + 44 + 48 + 42 + 40 + 44 + 38
  let remainSeconds = daysOfYear * ALIEN_SECONDS_OF_DAY
  alienDate.calcYearFromSeconds(remainSeconds)
  expect(alienDate.getYear()).toBe(startYear + 1)
  // less than one second, remain current year.
  alienDate.calcYearFromSeconds(remainSeconds - 1)
  expect(alienDate.getYear()).toBe(startYear)

  alienDate.calcYearFromSeconds(remainSeconds * 2)
  expect(alienDate.getYear()).toBe(startYear + 2)
})

test('test calcMonthAndDayFromSeconds', () => {
  // assuming start of month is 18
  let alienDate = new AlienDate()
  let remainSeconds = 1 * ALIEN_SECONDS_OF_DAY // add one day
  alienDate.calcMonthAndDayFromSeconds(remainSeconds)
  expect(alienDate.getMonth()).toBe(1)
  expect(alienDate.getDay()).toBe(2)

  remainSeconds = 44 * ALIEN_SECONDS_OF_DAY // 44 days
  alienDate.calcMonthAndDayFromSeconds(remainSeconds)
  expect(alienDate.getMonth()).toBe(2)
  expect(alienDate.getDay()).toBe(1)

  remainSeconds += 41 * ALIEN_SECONDS_OF_DAY // 44 + 41 days
  alienDate.calcMonthAndDayFromSeconds(remainSeconds)
  expect(alienDate.getMonth()).toBe(2)
  expect(alienDate.getDay()).toBe(42)

  remainSeconds += 1 * ALIEN_SECONDS_OF_DAY // 44 + 41 + 1 days
  alienDate.calcMonthAndDayFromSeconds(remainSeconds)
  expect(alienDate.getMonth()).toBe(3)
  expect(alienDate.getDay()).toBe(1)
})

test('test init from time seconds', () => {
  // 1 second Alien time is 0.5 second Earth time.
  // so if Earth time elapsed 1s then Alien time is 2 seconds
  // let remainSeconds = (new Date().getTime() / 1000) * 2
  let alienDate = new AlienDate()
  // after 6 days, also current year.
  let totalSeconds = 6 * ALIEN_SECONDS_OF_DAY
  // add 2 hours
  totalSeconds += 2 * ALIEN_SECONDS_OF_HOUR
  // add three minutes
  totalSeconds += 3 * ALIEN_SECONDS_OF_MINUTE
  // add 1 second
  totalSeconds += 1
  // Year 2804, Month 18, Day 31, Hour 2, Minute 2, Second 88 Alien’s time.
  alienDate.initFromTimeSeconds(totalSeconds)
  expect(alienDate.getYear()).toBe(startYear)
  expect(alienDate.getMonth()).toBe(18)
  expect(alienDate.getDay()).toBe(31 + 6)
  expect(alienDate.getHour()).toBe(2 + 2)
  expect(alienDate.getMinute()).toBe(2 + 3)
  expect(alienDate.getSecond()).toBe(88 + 1)

  // add more 2 second, over 90 seconds.
  totalSeconds += 2 // 88 + 3 = 91
  alienDate.initFromTimeSeconds(totalSeconds)
  expect(alienDate.getYear()).toBe(startYear)
  expect(alienDate.getMonth()).toBe(18)
  expect(alienDate.getDay()).toBe(31 + 6)
  expect(alienDate.getHour()).toBe(2 + 2)
  expect(alienDate.getMinute()).toBe(2 + 3 + 1)
  expect(alienDate.getSecond()).toBe(1)

  // after 8 days, move to next year.
  totalSeconds = 8 * ALIEN_SECONDS_OF_DAY
  totalSeconds += 1 * ALIEN_SECONDS_OF_HOUR
  totalSeconds += 2 * ALIEN_SECONDS_OF_MINUTE
  totalSeconds += 1
  alienDate.initFromTimeSeconds(totalSeconds)
  expect(alienDate.getYear()).toBe(startYear + 1)
  expect(alienDate.getMonth()).toBe(1)
  expect(alienDate.getDay()).toBe(1)
  expect(alienDate.getHour()).toBe(2 + 1)
  expect(alienDate.getMinute()).toBe(2 + 2)
  expect(alienDate.getSecond()).toBe(88 + 1)
})