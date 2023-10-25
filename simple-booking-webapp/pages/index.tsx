import React, { FC, useEffect } from 'react'
import { Link, Spinner } from '@nextui-org/react'

import Layout from '@/components/Layout'
import FormButton from '@/components/FormItems/FormButton'
import HowItWorks from '@/components/HowItWorks'
import Appointments from '@/components/Appointments'
import AppointmentForm from '@/components/AppointmentForm'
import { Appointment } from './types'

interface Props {
  data: Appointment[]
}

const Home: FC<Props> = ({ data }) => {
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

      {data ? (
        <>
          <div className='mt-20 lg:mt-32'>
            <Appointments data={data} />
          </div>
          <div className='mt-20 lg:mt-32'>
            <AppointmentForm />
          </div>
        </>
      ) : (
        <p className='mt-20 lg:mt-32 text-center opacity-60'>
          Oh no! No data source found 😱
        </p>
      )}
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/api/appointments`)
  const data: Appointment[] = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
