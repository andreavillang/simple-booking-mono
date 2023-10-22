import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React, { FC, ReactNode } from 'react'

interface Props {
  header: string
  description: string
  icon: ReactNode
}

const Panel: FC<Props> = ({ header, description, icon }) => {
  return (
    <Card
      className='py-4 bg-slate-900'
      classNames={{
        base: ['data-[hover=true]:bg-slate-800 data-[hover=true]:scale-105'],
      }}
      isHoverable
    >
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start gap-y-5'>
        {icon}
        <h6 className='font-bold'>{header}</h6>
      </CardHeader>
      <CardBody>
        <p className='text-default-500 mb-6'>{description}</p>
      </CardBody>
    </Card>
  )
}

export default Panel
