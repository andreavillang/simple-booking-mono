import React, { FC, ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '../Navbar'
import cn from 'classnames'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={cn(inter.className, 'bg-background w-full min-h-screen')}>
      <Navbar />
      <div className='container mx-auto px-4 lg:px-6'>{children}</div>
    </div>
  )
}

export default Layout
