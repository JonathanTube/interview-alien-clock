const START_YEAR = 2804
const ALIEN_CORNERSTONE_DATE_TIME = {
  year: START_YEAR,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0
}
// There are 18 months in Aliens' world
// each month has different number of days.
export const ALIEN_DAYS_OF_MONTH = [
  44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38
]
// 1 minute is 90 seconds.
export const ALIEN_SECONDS_OF_MINUTE = 90
// 1 hour is 90 minutes.
export const ALIEN_SECONDS_OF_HOUR = ALIEN_SECONDS_OF_MINUTE * 90
// 1 day is 36 hours.
export const ALIEN_SECONDS_OF_DAY = 36 * ALIEN_SECONDS_OF_HOUR
// sum the days of one year in Aliens' world.
export const ALIEN_DAYS_OF_YEAR = ALIEN_DAYS_OF_MONTH.reduce((a, b) => a + b)
// getting total seconds of one year in Aliens' world.
export const ALIEN_SECONDS_OF_YEAR = ALIEN_SECONDS_OF_DAY * ALIEN_DAYS_OF_YEAR

export default class AlienDate {
  initFromTimeSeconds(timeSeconds) {
    if (!timeSeconds) return
    let remainSeconds = Math.floor(timeSeconds)
    // because of the start date and time doesn't start from the beginning.
    // so we need to add the seconds until the assigned starting time.
    remainSeconds += this.getAdditionalSeconds()
    // set year
    this.calcYearFromSeconds(remainSeconds)
    // set month and day
    remainSeconds = remainSeconds % ALIEN_SECONDS_OF_YEAR
    this.calcMonthAndDayFromSeconds(remainSeconds)
    // set hour
    remainSeconds = remainSeconds % ALIEN_SECONDS_OF_DAY
    this.hour = Math.floor(remainSeconds / ALIEN_SECONDS_OF_HOUR)
    // set minute
    remainSeconds = remainSeconds % ALIEN_SECONDS_OF_HOUR
    this.minute = Math.floor(remainSeconds / ALIEN_SECONDS_OF_MINUTE)
    // set second
    remainSeconds = remainSeconds % ALIEN_SECONDS_OF_MINUTE
    this.calcSecondFromSeconds(remainSeconds)
  }

  /**
   * using total time seconds divided by the seconds of the aliens' year and then plus the cornorstone year.
   */
  calcYearFromSeconds(remainSeconds) {
    this.year = Math.floor(remainSeconds / ALIEN_SECONDS_OF_YEAR) + ALIEN_CORNERSTONE_DATE_TIME.year
  }

  calcMonthAndDayFromSeconds(remainSeconds) {
    let remainDays = Math.floor(remainSeconds / ALIEN_SECONDS_OF_DAY)
    for (let i = 0; i < ALIEN_DAYS_OF_MONTH.length; i++) {
      if (remainDays < ALIEN_DAYS_OF_MONTH[i]) {
        this.month = i + 1
        break
      }
      remainDays -= ALIEN_DAYS_OF_MONTH[i]
    }
    this.day = remainDays + ALIEN_CORNERSTONE_DATE_TIME.day
  }

  calcSecondFromSeconds(remainSeconds) {
    this.second = remainSeconds
  }

  getAdditionalSeconds() {
    let additionalSeconds = 0
    let monthIndex = 17
    for (let i = 0; i < monthIndex; i++) {
      additionalSeconds += ALIEN_DAYS_OF_MONTH[i] * ALIEN_SECONDS_OF_DAY
    }
    // add seconds of last days of month
    additionalSeconds += 30 * ALIEN_SECONDS_OF_DAY
    additionalSeconds += 2 * ALIEN_SECONDS_OF_HOUR
    additionalSeconds += 2 * ALIEN_SECONDS_OF_MINUTE
    additionalSeconds += 88

    return additionalSeconds
  }

  setDateTime(year, month, day, hour, minute, second) {
    if (year < START_YEAR) {
      throw new Error(`Year must be greater than ${START_YEAR}`)
    }
    if (!Number.isInteger(year)) {
      throw new Error(`Year must put a number of year.`)
    }
    // handle year
    let yearSeconds = (year - START_YEAR) * ALIEN_SECONDS_OF_YEAR
    // handle month
    let monthDiff = month - ALIEN_CORNERSTONE_DATE_TIME.month
    let monthSeconds = 0
    for (let i = 0; i < monthDiff; i++) {
      monthSeconds += ALIEN_DAYS_OF_MONTH[i] * ALIEN_SECONDS_OF_DAY
    }
    // handle day
    let daySeconds = (day - ALIEN_CORNERSTONE_DATE_TIME.day) * ALIEN_SECONDS_OF_DAY
    // handle hour
    let hourSeconds = (hour - ALIEN_CORNERSTONE_DATE_TIME.hour) * ALIEN_SECONDS_OF_HOUR
    // handle minute
    let minuteSeconds = (minute - ALIEN_CORNERSTONE_DATE_TIME.minute) * ALIEN_SECONDS_OF_MINUTE
    // handle second
    let seconds = second - ALIEN_CORNERSTONE_DATE_TIME.second
    let totalSeconds =
      yearSeconds +
      monthSeconds +
      daySeconds +
      hourSeconds +
      minuteSeconds +
      seconds -
      this.getAdditionalSeconds() // minus additional seconds from custom starting time according to the starting date time of the requirement.
    this.initFromTimeSeconds(totalSeconds)
    return totalSeconds
  }
  getYear() {
    return this.year
  }

  getMonth() {
    return this.month
  }

  getDay() {
    return this.day
  }

  getHour() {
    return this.hour
  }
  getMinute() {
    return this.minute
  }
  getSecond() {
    return this.second
  }
}
