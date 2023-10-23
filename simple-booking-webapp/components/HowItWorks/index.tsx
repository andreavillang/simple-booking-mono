import React, { FC } from 'react'
import Panel from './Panel'
import CalendarEvent from '../Icons/CalendarEvent'
import EditNote from '../Icons/EditNote'
import Inventory from '../Icons/Inventory'

const HowItWorks: FC = () => {
  const ICON_SIZE = '40'

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
      <Panel
        header='Fill up the form with your details'
        description='No sign-up necessary. We just ask for a name, some comments and a password.'
        icon={<EditNote width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <Panel
        header='Choose an available date and time'
        description='You can take any free slots within our opening hours of 8am to 5pm.'
        icon={<CalendarEvent width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <Panel
        header='Book your slot and edit or cancel anytime'
        description="That's it! You can use your password to edit or cancel anytime."
        icon={<Inventory width={ICON_SIZE} height={ICON_SIZE} />}
      />
    </div>
  )
}

export default HowItWorks
