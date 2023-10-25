import React, { FC, useCallback, useState } from 'react'
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

import Edit from '@/components/Icons/Edit'
import Delete from '@/components/Icons/Delete'
import PasswordModal from '@/components/Modals/PasswordModal'
import BookModal from '@/components/Modals/BookModal'
import { Appointment } from '@/pages/types'
import { bookingTableHeaders } from '@/utils/data'

interface Props {
  data: Appointment[]
}

const AppointmentsTable: FC<Props> = ({ data }) => {
  const ACTION_ICON_SIZE = '20'

  const [selected, setSelected] = useState<Appointment>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false)
  const [isBookingModalVisible, setIsBookingModalVisible] =
    useState<boolean>(false)

  const formatDate = (date: string) => {
    return moment(date).format('MMM DD, YYYY')
  }

  const formatTime = (date: string) => {
    return moment(date).format('h a')
  }

  const renderCell = useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey]

    switch (columnKey) {
      case 'date':
        return <small>{formatDate(data.schedule)}</small>
      case 'time':
        return <small>{formatTime(data.schedule)}</small>
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

  return (
    <>
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
        <TableBody emptyContent='No appointments found' items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default AppointmentsTable
