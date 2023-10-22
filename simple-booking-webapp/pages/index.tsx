import FormButton from '@/components/FormButton'
import HowItWorks from '@/components/HowItWorks'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className='mb-40'>
        <h3>Welcome to SimpleBook</h3>
        <h3 className='mb-8'>Book appointments in 3 easy steps!</h3>
        <HowItWorks />
        <div className='flex justify-center'>
          <FormButton type='submit' color='primary' as={Link} href='/create'>
            Book an appointment now
          </FormButton>
        </div>
      </div>

      <div id='booking-list'>
        <h6>Current Appointments</h6>
      </div>
    </Layout>
  )
}
