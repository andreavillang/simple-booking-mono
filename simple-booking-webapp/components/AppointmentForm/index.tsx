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
import { formatDateForInput } from '@/utils/functions'

type Inputs = {
  name: string
  comments: string
  date: string
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
  const [selectedTime, setSelectedTime] = useState<string>(
    data?.date
      ? moment(data?.date)
          .format('H')
          .toString()
      : ''
  )

  const formDefaultValues = {
    name: data?.name ? data.name : '',
    comments: data?.comments ? data.comments : '',
    date: data?.date
      ? moment(data?.date)
          .format('YYYY-MM-DD')
          .toString()
      : '',
    password: '',
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const requestData = {
      name: data.name.trim(),
      comments: data.comments.trim(),
      date: moment(`${data.date} ${selectedTime}:00:00`).format(),
      password: data.password.trim(),
    }

    console.log(requestData)

    alert('Thank you for submitting your appointment')
    setSelectedTime('')
    reset()
    trigger()
  }

  const buttonDisabled = !isValid

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
            name='date'
            control={control}
            rules={{
              required: 'Please select a date',
              min: {
                value: formatDateForInput(moment()),
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
                min={formatDateForInput(moment())}
                hasError={errors.date && true}
              />
            )}
          />
          {errors.date && (
            <small className='absolute left-0 -bottom-4 text-danger ml-1'>
              {errors.date.message}
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

        <div className='flex justify-center'>
          <FormButton type='submit' isDisabled={buttonDisabled}>
            {isEditForm ? 'Edit appointment' : 'Book appointment'}
          </FormButton>
        </div>
      </form>
    </div>
  )
}

export default AppointmentForm
