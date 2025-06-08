import { computed } from 'vue'
import useDayjsHelper from './useDayjsHelper.js'
import provideConfig from '../provider/provideConfig.js'

export function useTimeAxisUnits() {
  const { precision } = provideConfig()
  const { chartStartDayjs, chartEndDayjs } = useDayjsHelper()

  const upperPrecision = computed(() => {
    switch (precision?.value) {
      case 'hour':
        return 'day'
      case 'day':
        return 'month'
      case 'date':
      case 'week':
        return 'month'
      case 'month':
        return 'year'
      default:
        throw new Error(
          "Precision prop incorrect. Must be one of the following: 'hour', 'day', 'date', 'week', 'month'"
        )
    }
  })

  const lowerPrecision = computed(() => {
    switch (precision.value) {
      case 'date':
        return 'day'
      case 'week':
        return 'isoWeek'
      default:
        return precision.value
    }
  })

  const lowerUnitsDisplayFormats = {
    hour: 'HH',
    date: 'DD.MMM',
    day: 'D',
    week: '第W周',
    month: 'MMM',
    year: 'YYYY'
  }
  const upperUnitsDisplayFormats = {
    hour: 'HH',
    date: 'DD.MMM',
    day: 'MMM',
    week: 'M月，YYYY年',
    month: 'YYYY年',
    year: 'YYYY'
  }

  const timeAxisUnits = computed(() => {
    const upperUnits: { label: string; value?: string; date: Date; width?: string }[] = []
    const lowerUnits: { label: string; value?: string; date: Date; width?: string }[] = []
    const totalMinutes = chartEndDayjs.value.diff(chartStartDayjs.value, 'minutes', true)
    const upperUnit = upperPrecision.value
    const lowerUnit = lowerPrecision.value
    let currentUpperUnit = chartStartDayjs.value
    let currentLowerUnit = chartStartDayjs.value

    while (currentLowerUnit.isSameOrBefore(chartEndDayjs.value)) {
      const endCurrentLowerUnit = currentLowerUnit.endOf(lowerUnit)
      // const isLastItem = endCurrentLowerUnit.isAfter(chartEndDayjs.value)

      // const lowerWidth = isLastItem
      //   ? (chartEndDayjs.value.diff(currentLowerUnit, 'minutes', true) / totalMinutes) * 100
      //   : (endCurrentLowerUnit.diff(currentLowerUnit, 'minutes', true) / totalMinutes) * 100
      const lowerWidth =
        (endCurrentLowerUnit.diff(currentLowerUnit, 'minutes', true) / totalMinutes) * 100

      lowerUnits.push({
        label: currentLowerUnit.format(lowerUnitsDisplayFormats[precision?.value]),
        value: String(currentLowerUnit),
        date: currentLowerUnit.toDate(),
        width: String(lowerWidth) + '%'
      })
      currentLowerUnit = endCurrentLowerUnit
        .add(1, lowerUnit === 'isoWeek' ? 'week' : lowerUnit)
        .startOf(lowerUnit)
    }
    while (currentUpperUnit.isSameOrBefore(chartEndDayjs.value)) {
      const endCurrentUpperUnit = currentUpperUnit.endOf(upperUnit)
      // const isLastItem = endCurrentUpperUnit.isAfter(chartEndDayjs.value)

      // const upperWidth = isLastItem
      //   ? (chartEndDayjs.value.diff(currentUpperUnit, 'minutes', true) / totalMinutes) * 100
      //   : (endCurrentUpperUnit.diff(currentUpperUnit, 'minutes', true) / totalMinutes) * 100
      const upperWidth =
        (endCurrentUpperUnit.diff(currentUpperUnit, 'minutes', true) / totalMinutes) * 100

      upperUnits.push({
        label: currentUpperUnit.format(upperUnitsDisplayFormats[precision?.value]),
        value: String(currentUpperUnit),
        date: currentUpperUnit.toDate(),
        width: String(upperWidth) + '%'
      })

      currentUpperUnit = endCurrentUpperUnit.add(1, upperUnit).startOf(upperUnit)
    }
    return { upperUnits, lowerUnits }
  })

  return {
    timeAxisUnits
  }
}

export function generateRandomKey(length = 16) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    key += charset[randomIndex]
  }
  return key
}
