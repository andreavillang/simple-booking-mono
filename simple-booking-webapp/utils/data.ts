import { Appointment } from '@/pages/types'
import moment from 'moment'

export const bookingTableHeaders = [
  { name: 'DATE', uid: 'date' },
  { name: 'TIME', uid: 'time' },
  { name: 'NAME', uid: 'name' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const timeSlots = [
  {
    label: '8 AM',
    value: '8',
  },
  {
    label: '9 AM',
    value: '9',
  },
  {
    label: '10 AM',
    value: '10',
  },
  {
    label: '11 AM',
    value: '11',
  },
  {
    label: '12 NN',
    value: '12',
  },
  {
    label: '1 PM',
    value: '13',
  },
  {
    label: '2 PM',
    value: '14',
  },
  {
    label: '3 PM',
    value: '15',
  },
  {
    label: '4 PM',
    value: '16',
  },
]

export const bookingTableData: Appointment[] = [
  {
    id: '1',
    date: new Date('October 23, 2023 08:00:00'),
    name: 'Tony Reichert',
    comments: 'This is my comment about my booking information',
    password: '1234',
  },
  {
    id: '2',
    date: new Date('October 23, 2023 09:00:00'),
    name: 'Zoey Lang',
    comments: 'This is my comment about my booking information',
    password: 'abcd',
  },
  {
    id: '3',
    date: new Date('October 23, 2023 10:00:00'),
    name: 'Jane Fisher',
    comments: 'This is my comment about my booking information',
    password: '1234',
  },
  {
    id: '4',
    date: new Date('October 23, 2023 13:00:00'),
    name: 'William Howard',
    comments: 'This is my comment about my booking information',
    password: 'abcd',
  },
  {
    id: '5',
    date: new Date('October 23, 2023 15:00:00'),
    name: 'Kristen Copper',
    comments: 'This is my comment about my booking information',
    password: '1234',
  },
]
