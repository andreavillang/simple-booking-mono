import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-background-dark py-20 mt-32'>
      <div className='flex gap-2 items-center justify-center'>
        <p>SimpleBook</p>
        <small className='rounded-full px-4 py-1.5 bg-slate-900 italic tracking-widest'>
          MD
        </small>
      </div>
      <small className='mt-2 flex justify-center opacity-70'>
        Powered by Next JS and Spring Boot
      </small>
    </footer>
  )
}

export default Footer
