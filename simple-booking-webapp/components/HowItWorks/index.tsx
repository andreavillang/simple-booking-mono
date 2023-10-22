import React, { FC } from 'react'
import Panel from './Panel'
import CalendarEvent from '../Icons/CalendarEvent'
import EditNote from '../Icons/EditNote'
import Inventory from '../Icons/Inventory'

const HowItWorks: FC = () => {
  const ICON_SIZE = '40'

  return (
    <div className='grid grid-cols-3 gap-4 mb-8'>
      <Panel
        header='Choose an available date and time'
        description='You can take any free slots within our opening hours (8 AM - 5 PM)'
        icon={<CalendarEvent width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <Panel
        header='Fill in your details and edit or cancel anytime'
        description='We only need a name, mobile number and a password so you can edit your appointment schedule'
        icon={<EditNote width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <Panel
        header='Book your appointment'
        description="We'll send you a confirmation ticket and be sure to see you then!"
        icon={<Inventory width={ICON_SIZE} height={ICON_SIZE} />}
      />
    </div>
  )
}

export default HowItWorks
