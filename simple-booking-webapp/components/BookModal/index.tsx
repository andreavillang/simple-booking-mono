import React, { FC } from 'react'
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import FormButton from '../FormItems/FormButton'
import AppointmentForm from '../AppointmentForm'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const BookModal: FC<Props> = ({ isOpen, onClose }) => {
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
      classNames={customStyles}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <AppointmentForm
              header='Edit your appointment'
              descripion='Change your details then enter your password to confirm your identity'
              removeWrapper
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default BookModal
