import FormButton from '@/components/FormItems/FormButton'
import FormInput from '@/components/FormItems/FormInput'
import { formatDateForInput, getTomorrow, isDateBeforeToday } from '@/utils/functions'
import moment from 'moment'
import { FC, useState } from 'react'

interface Props {
  handleFilter: (startDate: string, endDate: string | undefined) => void
}

const DateFilter: FC<Props> = ({ handleFilter }) => {
  const TOMORROW = getTomorrow()

  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  const buttonDisabled = !startDate || isDateBeforeToday(startDate)

  return (
    <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
      <div className='flex gap-x-4 md:mb-0'>
        <div className='inline-block'>
          <FormInput
            type='date'
            label='Start Date'
            placeholder='Click to set date'
            onValueChange={(e) => {
              setStartDate(e)
              setEndDate('')
            }}
            value={startDate}
            isRequired
            min={formatDateForInput(TOMORROW)}
          />
        </div>
        <div className='inline-block'>
          <FormInput
            isDisabled={!startDate}
            type='date'
            label='End Date'
            placeholder='Click to set date'
            onValueChange={setEndDate}
            value={endDate}
            min={formatDateForInput(moment(startDate).add(1, 'day'))}
          />
        </div>
      </div>

      <FormButton
        isDisabled={buttonDisabled}
        onPress={() => handleFilter(startDate!, endDate)}
      >
        Filter
      </FormButton>
    </div>
  )
}

export default DateFilter
