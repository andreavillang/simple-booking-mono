import React, { FC } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import AppointmentForm from '../../AppointmentForm'
import { Appointment } from '@/pages/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  data?: Appointment
}

const BookModal: FC<Props> = ({ data, isOpen, onClose }) => {
  const { onOpenChange } = useDisclosure()

  const customStyles = {
    base: 'bg-card py-4',
    closeButton: 'hover:bg-background',
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size='xl'
      classNames={customStyles}
      placement='top-center'
      scrollBehavior='outside'
    >
      <ModalContent>
        <ModalBody>
          <AppointmentForm
            header='Edit your appointment'
            descripion='Change your details then enter your password to confirm your identity'
            removeWrapper
            data={data}
            isEditForm
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BookModal
