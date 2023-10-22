import React, { FC } from 'react'
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import FormButton from '../FormButton'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const BookModal: FC<Props> = ({ isOpen, onClose }) => {
  const {onOpenChange} = useDisclosure()

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Enter your details</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Name'
                placeholder='Enter your name'
                variant='bordered'
              />
              <Input
                label='Password'
                placeholder='Enter your password'
                type='password'
                variant='bordered'
              />
              <Input
                autoFocus
                type='date'
                label='Schedule Appointment'
                placeholder='Click to set date'
                variant='bordered'
              />
              <div>
                <p className='mb-2'>Choose an available time:</p>
                <div className='flex flex-wrap gap-2'>
                  <div className='cursor-pointer px-4 py-1 rounded-full border border-2 border-foreground'>9 AM</div>
                  <div className='cursor-pointer px-4 py-1 rounded-full border border-2 border-foreground'>10 AM</div>
                  <div className='cursor-pointer px-4 py-1 rounded-full border border-2 border-foreground'>11 AM</div>
                  <div className='cursor-pointer px-4 py-1 rounded-full border border-2 border-foreground'>12 AM</div>
                  <div className='cursor-pointer px-4 py-1 rounded-full border border-2 border-foreground'>1 PM</div>
                </div>
                
              </div>
            </ModalBody>
            <ModalFooter>
              <FormButton color='danger' variant='flat' onPress={onClose}>Close</FormButton>
              <FormButton>Book Appointment</FormButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default BookModal
