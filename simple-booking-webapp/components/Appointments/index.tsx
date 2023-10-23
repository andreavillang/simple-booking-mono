import React, { useCallback, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import Edit from '../Icons/Edit'
import Delete from '../Icons/Delete'
import PasswordModal from '../Modals/PasswordModal'
import BookModal from '../Modals/BookModal'
import DateFilter from './DateFilter'
import { Appointment } from '@/pages/types'
import { bookingTableData, bookingTableHeaders } from '@/utils/data'
import { filterAppointments } from '@/utils/functions'

const Appointments = () => {
  const ACTION_ICON_SIZE = '20'

  const [filtered, setFiltered] = useState<Appointment[]>(bookingTableData)
  const [selected, setSelected] = useState<Appointment>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false)
  const [isBookingModalVisible, setIsBookingModalVisible] =
    useState<boolean>(false)

  const formatDate = (date: Date) => {
    return moment(date).format('MMM DD, YYYY')
  }

  const formatTime = (date: Date) => {
    return moment(date).format('h a')
  }

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey]

    switch (columnKey) {
      case 'date':
        return <small>{formatDate(data.date)}</small>
      case 'time':
        return <small>{formatTime(data.date)}</small>
      case 'name':
        return <small>{data.name}</small>
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip color='primary' content='Edit Booking'>
              <span
                className='text-lg text-foreground cursor-pointer active:opacity-50'
                onClick={() => {
                  setSelected(data)
                  setIsBookingModalVisible(true)
                }}
              >
                <Edit width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete Booking'>
              <span
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={() => {
                  setSelected(data)
                  setIsDeleteModalVisible(true)
                }}
              >
                <Delete
                  color='danger'
                  width={ACTION_ICON_SIZE}
                  height={ACTION_ICON_SIZE}
                />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const customStyles = {
    wrapper: 'bg-card',
    tbody: 'rounded-lg',
    tr: 'odd:bg-card-light even:bg-card-lightest',
    th: 'bg-card',
  }

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
          <Table
            aria-label='Example table with custom cells'
            classNames={customStyles}
          >
            <TableHeader columns={bookingTableHeaders}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent='No appointments found' items={filtered}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {isDeleteModalVisible && (
        <PasswordModal
          isOpen={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          data={selected}
        />
      )}
      {isBookingModalVisible && (
        <BookModal
          isOpen={isBookingModalVisible}
          onClose={() => setIsBookingModalVisible(false)}
          data={selected}
        />
      )}
    </>
  )
}

export default Appointments
