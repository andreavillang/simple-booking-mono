import React from 'react'
import { Link } from '@nextui-org/react'

import Layout from '@/components/Layout'
import FormButton from '@/components/FormItems/FormButton'
import HowItWorks from '@/components/HowItWorks'
import Appointments from '@/components/Appointments'
import AppointmentForm from '@/components/AppointmentForm'

export default function Home() {
  return (
    <Layout>
      <div>
        <h3>Welcome to SimpleBook</h3>
        <h3 className='mb-4 lg:mb-8'>Book appointments in 3 easy steps!</h3>
        <HowItWorks />
        <div className='flex flex-col items-center gap-2'>
          <FormButton type='submit' color='primary' as={Link} href='#form'>
            Book an appointment now
          </FormButton>
          <Link
            href='#appointments'
            size='sm'
            color='foreground'
            className='opacity-60 cursor-pointer underline underline-offset-2'
          >
            Or edit/cancel your appointment below
          </Link>
        </div>
      </div>

      <div className='mt-32'>
        <Appointments />
      </div>

      <div className='mt-32'>
        <AppointmentForm />
      </div>
    </Layout>
  )
}
