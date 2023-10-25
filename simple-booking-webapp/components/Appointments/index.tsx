import React, { FC, useState } from 'react'

import AppointmentsTable from './AppointmentsTable'
import DateFilter from './DateFilter'
import { Appointment } from '@/pages/types'
import { filterAppointments } from '@/utils/functions'

interface Props {
  data: Appointment[]
}

const Appointments: FC<Props> = ({ data }) => {
  const [filtered, setFiltered] = useState<Appointment[]>(data)

  const filterResults = (
    startDate: string | undefined,
    endDate: string | undefined
  ) => {
    const results: Appointment[] = filterAppointments(data, startDate, endDate)

    setFiltered([...results])
  }

  return (
    <>
      <div id='appointments'>
        <h6>Current Appointments</h6>
        <p className='opacity-60 mb-8'>
          See a list of all active appointments. You can edit or delete yours
          below.
        </p>

        <small className='ml-1'>Filter by date:</small>
        <div className='flex flex-col gap-6 mt-2'>
          <DateFilter handleFilter={filterResults} />
          <AppointmentsTable data={filtered} />
        </div>
      </div>
    </>
  )
}

export default Appointments
