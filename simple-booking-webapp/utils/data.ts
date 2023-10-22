import { Appointment } from "@/pages/types"
import moment from "moment"

export const bookingTableHeaders = [
  {name: 'DATE', uid: 'date'},
  {name: 'TIME', uid: 'time'},
  {name: 'NAME', uid: 'name'},
  {name: 'ACTIONS', uid: 'actions'},
]

export const timeSlots = [
  {
    label: '8 AM - 9 AM',
    value: '8'
  },
  {
    label: '9 AM - 10 AM',
    value: '9'
  },
  {
    label: '10 AM - 11 AM',
    value: '10'
  },
  {
    label: '11 AM - 12 NN',
    value: '11'
  },
  {
    label: '12 NN - 1 PM',
    value: '12'
  },
  {
    label: '1 PM - 2 PM',
    value: '1'
  },
  {
    label: '2 PM - 3 PM',
    value: '2'
  },
  {
    label: '3 PM - 4 PM',
    value: '3'
  },
  {
    label: '4 PM - 5 PM',
    value: '4'
  }
]

export const bookingTableData: Appointment[] = [
  {
    id: '1',
    date: new Date('October 23, 2023 08:00:00'),
    name: 'Tony Reichert',
    comments: 'This is my comment about my booking information',
    password: '1234'
  },
  {
    id: '2',
    date: new Date('October 23, 2023 09:00:00'),
    name: 'Zoey Lang',
    comments: 'This is my comment about my booking information',
    password: 'abcd'
  },
  {
    id: '3',
    date: new Date('October 23, 2023 10:00:00'),
    name: 'Jane Fisher',
    comments: 'This is my comment about my booking information',
    password: '1234'
  },
  {
    id: '4',
    date: new Date('October 23, 2023 13:00:00'),
    name: 'William Howard',
    comments: 'This is my comment about my booking information',
    password: 'abcd'
  },
  {
    id: '5',
    date: new Date('October 23, 2023 15:00:00'),
    name: 'Kristen Copper',
    comments: 'This is my comment about my booking information',
    password: '1234'
  },
]