import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-background-dark mb-12'>
      <div className='container mx-auto px-4 lg:px-6 py-6'>
        <div className='flex gap-2 items-center'>
          <h6>SimpleBook</h6>
          <small className='rounded-full px-4 py-1.5 bg-slate-900 italic tracking-widest'>
            MD
          </small>
        </div>
      </div>
    </div>
  )
}

export default Navbar
