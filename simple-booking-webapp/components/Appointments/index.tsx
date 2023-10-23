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

import styles from './styles.module.scss'
import Edit from '../Icons/Edit'
import Delete from '../Icons/Delete'
import { bookingTableData, bookingTableHeaders } from '@/utils/data'
import PasswordModal from '../Modals/PasswordModal'
import { Appointment } from '@/pages/types'
import BookModal from '../Modals/BookModal'
import FormInput from '../FormItems/FormInput'
import FormButton from '../FormItems/FormButton'

const Appointments = () => {
  const [selected, setSelected] = useState<Appointment>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false)
  const [isBookingModalVisible, setIsBookingModalVisible] =
    useState<boolean>(false)

  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  const ACTION_ICON_SIZE = '20'

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

  const filterResults = () => {}

  const buttonDisabled =
    !startDate || moment().diff(moment(startDate), 'days') >= 1

  return (
    <>
      <div id='appointments'>
        <h6>Current Appointments</h6>
        <p className='opacity-60 mb-8 leading-tight'>
          See a list of all active appointments. You can edit or delete yours
          below.
        </p>

        <small className='ml-1'>Filter by date:</small>
        <div className='flex flex-col gap-6 mt-2'>
          <div className='flex gap-x-4 items-center'>
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
                min={moment().format('YYYY-MM-DD')}
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
                min={moment(startDate).add(1, 'day').format('YYYY-MM-DD')}
              />
            </div>
            <FormButton
              isDisabled={buttonDisabled}
              onPress={() => filterResults()}
            >
              Filter
            </FormButton>
          </div>

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
