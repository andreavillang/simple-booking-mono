import React, { useState } from 'react'

import FormButton from '@/components/FormItems/FormButton'
import HowItWorks from '@/components/HowItWorks'
import Layout from '@/components/Layout'
import Appointments from '@/components/Appointments'
import { Link } from '@nextui-org/react'
import BookModal from '@/components/BookModal'
import AppointmentForm from '@/components/AppointmentForm'

export default function Home() {
  const [isBookingModalVisible, setIsBookingModalVisible] =
    useState<boolean>(false)

  return (
    <>
      <Layout>
        <div className='mb-32'>
          <h3>Welcome to SimpleBook</h3>
          <h3 className='mb-8'>Book appointments in 3 easy steps!</h3>
          <HowItWorks />
          <div className='flex flex-col items-center gap-2'>
            <FormButton type='submit' color='primary' as={Link} href='#form'>
              Book an appointment now
            </FormButton>
            <Link
              href='#appointments'
              size='sm'
              color='foreground'
              className='opacity-60 cursor-pointer'
            >
              or see existing appointments below
            </Link>
          </div>
        </div>

        <Appointments />

        <div className='mt-32'>
          <AppointmentForm />
        </div>
      </Layout>
      {isBookingModalVisible && (
        <BookModal
          isOpen={isBookingModalVisible}
          onClose={() => setIsBookingModalVisible(false)}
        />
      )}
    </>
  )
}
