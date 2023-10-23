import React, { FC, useState } from 'react'
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import FormButton from '../../FormItems/FormButton'
import FormInput from '@/components/FormItems/FormInput'
import { Appointment } from '@/pages/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  data?: Appointment
}

const PasswordModal: FC<Props> = ({ data, isOpen, onClose }) => {
  const { onOpenChange } = useDisclosure()

  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const customStyles = {
    base: 'bg-card py-6 dark',
    closeButton: 'hover:bg-background',
  }

  const onSubmit = (passwordData: string) => {
    if (data?.password === passwordData) {
      console.log('passwords match')
    } else {
      setPasswordError(true)
    }
  }

  const buttonDisabled = !password || !data

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={customStyles}
      placement='top-center'
    >
      <ModalContent>
        <ModalBody>
          <form className='flex flex-col gap-5'>
            <p>
              By entering your password below, you are agreeing to cancel your
              appointment.
            </p>
            <div>
              <FormInput
                label='Password'
                placeholder='Enter your password'
                onValueChange={(e) => {
                  setPassword(e)
                  setPasswordError(false)
                }}
                value={password}
                isRequired
                hasError={passwordError}
              />
              {passwordError && (
                <small className='text-danger mt-1 ml-1'>
                  You have entered the wrong password
                </small>
              )}
            </div>
            <div className='flex justify-center'>
              <FormButton
                color='danger'
                isDisabled={buttonDisabled}
                onPress={() => onSubmit(password)}
              >
                Cancel my appointment
              </FormButton>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PasswordModal
