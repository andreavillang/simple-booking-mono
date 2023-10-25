import { Appointment } from '@/pages/types'
import Router from 'next/router'

const BASE_URL = 'http://localhost:8080'

export const createAppointment = async (data: Appointment) => {
  try {
    const requestBody = JSON.stringify(data)
    const res = await fetch(`${BASE_URL}/api/appointments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    let message = ''
    switch (res.status) {
      case 201:
        message = 'Your appointment has been created'
        break
      case 400:
        message = 'An appointment with that schedule already exists'
        break
      default:
        message = 'Sorry! Something went wrong'
        break
    }
    return message
  } catch (error) {
    return 'Sorry! Something went wrong'
  }
}

export const updateAppointment = async (id: string, data: Appointment) => {
  try {
    const requestBody = JSON.stringify(data)
    const res = await fetch(`${BASE_URL}/api/appointments/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    let message = ''
    switch (res.status) {
      case 204:
        Router.reload()
        break
      case 403:
        message = 'You have entered the wrong password'
        break
      case 400:
        message = 'An appointment with that schedule already exists'
        break
    }
    return message
  } catch (error) {
    return 'Sorry! Something went wrong'
  }
}

export const deleteAppointment = async (id: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/appointments/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: password,
    })

    let message = ''
    switch (res.status) {
      case 204:
        Router.reload()
        break
      case 403:
        message = 'You have entered the wrong password'
        break
      case 400:
        message = 'That appointment has already ended'
        break
    }
    return message
  } catch (error) {
    return 'Sorry! Something went wrong'
  }
}
