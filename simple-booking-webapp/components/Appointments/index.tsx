import React, { useCallback } from 'react'
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

import styles from './styles.module.scss'
import Edit from '../Icons/Edit'
import Delete from '../Icons/Delete'
import { bookingTableData, bookingTableHeaders } from '@/utils/data'

const Appointments = () => {
  const ACTION_ICON_SIZE = '20'

  const formatDate = (date: Date) => {
    return moment(date).format('MMM DD, YYYY')
  }

  const formatTime = (date: Date) => {
    return moment(date).format('hh A')
  }

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey]

    switch (columnKey) {
      case 'date':
        return <p>{formatDate(data.date)}</p>
      case 'time':
        return <p>{formatTime(data.date)}</p>
      case 'name':
        return <p>{data.name}</p>
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip color='primary' content='Edit Booking'>
              <span className='text-lg text-foreground cursor-pointer active:opacity-50'>
                <Edit width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete Booking'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
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

  return (
    <div id='appointments'>
      <h6>Current Appointments</h6>
      <p className='opacity-60 mb-8 leading-tight'>
        See a list of all active appointments. You can edit or delete yours
        below.
      </p>
      <div className='flex flex-col lg:flex-row gap-6 items-center lg:items-start'>
        <Calendar
          className={styles.calendar}
          tileClassName={styles.calendarTile}
          minDate={new Date()}
        />
        <Table
          aria-label='Example table with custom cells'
          isStriped
          classNames={{
            wrapper: ['bg-card'],
            th: ['bg-background'],
          }}
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
          <TableBody items={bookingTableData}>
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
  )
}

export default Appointments
