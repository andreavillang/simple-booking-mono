import React, { useState } from 'react'
import DateFilter from './DateFilter'
import { Appointment } from '@/pages/types'
import { bookingTableData } from '@/utils/data'
import { filterAppointments } from '@/utils/functions'
import AppointmentsTable from './AppointmentsTable'

const Appointments = () => {
  const [filtered, setFiltered] = useState<Appointment[]>(bookingTableData)

  const filterResults = (startDate: string, endDate: string | undefined) => {
    const results: Appointment[] = filterAppointments(
      bookingTableData,
      startDate,
      endDate
    )

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
