import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'
import moment from 'moment'

import FormButton from '../FormItems/FormButton'
import FormInput from '../FormItems/FormInput'
import FormTextArea from '../FormItems/FormTextArea'
import TimeCheckbox from './TimeCheckbox'
import { Appointment } from '@/pages/types'
import { timeSlots } from '@/utils/data'
import { formatDateForInput, getTomorrow } from '@/utils/functions'
import { createAppointment, updateAppointment } from '@/utils/apiRequests'

type Inputs = {
  name: string
  comments: string
  schedule: string
  password: string
}

interface Props {
  header?: string
  descripion?: string
  isEditForm?: boolean
  removeWrapper?: boolean
  data?: Appointment
}

const AppointmentForm: FC<Props> = ({
  header = 'Book an appointment',
  descripion = 'Fill in the details we need below',
  removeWrapper,
  isEditForm,
  data,
}) => {
  const TOMORROW = getTomorrow()

  const [formError, setFormError] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>(
    data?.schedule
      ? moment(data.schedule)
          .format('H')
      : ''
  )

  const formDefaultValues = {
    name: data?.name ? data.name : '',
    comments: data?.comments ? data.comments : '',
    schedule: data?.schedule
      ? formatDateForInput(data.schedule)
      : '',
    password: ''
  }

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: formDefaultValues,
  })

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const requestData = {
      id: '',
      name: formData.name.trim(),
      comments: formData.comments.trim(),
      schedule: moment(`${formData.schedule} ${selectedTime}:00:00`).format('YYYY-MM-DDTHH:mm:SS'),
      password: formData.password.trim(),
    }

    if (isEditForm) {
      const error = await updateAppointment(data!.id, requestData)
      setFormError(error)
    } else {
      const error = await createAppointment(requestData)
      setFormError(error)
    }

    const resetForm = {
      name: requestData.name,
      comments: requestData.comments,
      schedule: formData.schedule,
      password: ''
    }

    reset(resetForm)
    trigger()
  }

  const buttonDisabled = !isValid || !selectedTime

  const setPasswordHeader = isEditForm
    ? 'Enter your password to confirm your edits'
    : 'We need a password so you can edit or cancel your appointments anytime'

  return (
    <div id='form' className='mx-auto w-full lg:max-w-[600px]'>
      <h6>{header}</h6>
      <p className='opacity-60 mb-8'>{descripion}</p>
      <form
        className={cn(
          'flex flex-col gap-4 lg:gap-6',
          !removeWrapper && 'bg-card p-4 lg:p-6 rounded-2xl'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='relative'>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Please add your name',
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label='Name'
                placeholder='Enter your name'
                onValueChange={onChange}
                value={value}
                isRequired
                hasError={errors.name && true}
              />
            )}
          />
          {errors.name && (
            <small className='absolute left-0 -bottom-4 text-danger ml-1'>
              {errors.name.message}
            </small>
          )}
        </div>

        <div className='relative'>
          <Controller
            name='comments'
            control={control}
            rules={{
              required: 'Please add some comments',
            }}
            render={({ field: { onChange, value } }) => (
              <FormTextArea
                label='Comments'
                placeholder='Enter your comments'
                onValueChange={onChange}
                value={value}
                isRequired
                hasError={errors.comments && true}
              />
            )}
          />
          {errors.comments && (
            <small className='absolute left-0 -bottom-4 text-danger ml-1'>
              {errors.comments.message}
            </small>
          )}
        </div>
        <div className='relative'>
          <Controller
            name='schedule'
            control={control}
            rules={{
              required: 'Please select a date',
              min: {
                value: formatDateForInput(TOMORROW),
                message: 'Please select a valid date',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                type='date'
                label='Schedule Appointment'
                placeholder='Click to set date'
                onValueChange={onChange}
                value={value}
                isRequired
                min={formatDateForInput(TOMORROW)}
                hasError={errors.schedule && true}
              />
            )}
          />
          {errors.schedule && (
            <small className='absolute left-0 -bottom-4 text-danger ml-1'>
              {errors.schedule.message}
            </small>
          )}
        </div>
        <div>
          <small className='ml-1 font-medium'>Choose an available time</small>
          <span className='text-xs text-danger ml-0.5'>*</span>
          <div className='flex flex-wrap gap-2 mt-2'>
            {timeSlots.map((item) => (
              <TimeCheckbox
                key={item.value}
                label={item.label}
                isSelected={selectedTime === item.value}
                handleOnSelect={() => setSelectedTime(item.value)}
              />
            ))}
          </div>
        </div>

        <hr className='border-card-lightest border-2 opacity-50 mt-2' />

        <div>
          <small className='ml-1 font-medium'>{setPasswordHeader}</small>
          <div className='relative mt-2'>
            <Controller
              name='password'
              control={control}
              rules={{
                required: isEditForm
                  ? 'We need your password to confirm your edits'
                  : 'Use a password so you can edit or delete your appointment anytime',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  onValueChange={onChange}
                  value={value}
                  isRequired
                  hasError={errors.password && true}
                />
              )}
            />
            {errors.password && (
              <small className='absolute left-0 -bottom-4 text-danger ml-1'>
                {errors.password.message}
              </small>
            )}
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center'>
            <FormButton type='submit' isDisabled={buttonDisabled}>
              {isEditForm ? 'Edit appointment' : 'Book appointment'}
            </FormButton>
          </div>
          {formError &&
            <small className='text-danger font-medium mt-1'>{formError}</small>
          }
        </div>
      </form>
    </div>
  )
}

export default AppointmentForm
