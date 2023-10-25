import { Appointment } from '@/pages/types'
import moment, { Moment } from 'moment'

export const getTomorrow = () => {
  return moment().add(1, 'day').endOf('day')
}

export const formatDateForInput = (date: Date | string | Moment) => {
  return moment(date).format('YYYY-MM-DD')
}

export const filterAppointments = (
  data: Appointment[],
  startDate: string,
  endDate: string | undefined
) => {
  const resArr: Appointment[] = []

  data.filter((item) => {
    const when = moment(formatDateForInput(item.schedule))
    const start = moment(formatDateForInput(startDate))
    const end = endDate ? moment(formatDateForInput(endDate)) : undefined
    const isWithinRange = when.isBetween(start, end, undefined, '[]')

    if (!endDate && when.isSame(start)) {
      resArr.push(item)
    } else if (isWithinRange) {
      resArr.push(item)
    }
  })

  return resArr
}

export const isDateBeforeToday = (date: Date | string | Moment) => {
  return moment(date).startOf('day').isBefore(moment().startOf('day'))
}
