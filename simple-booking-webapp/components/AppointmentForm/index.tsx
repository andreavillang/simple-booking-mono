import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import FormButton from '../FormItems/FormButton'
import FormInput from '../FormItems/FormInput'
import FormTextArea from '../FormItems/FormTextArea'
import { timeSlots } from '@/utils/data'
import TimeCheckbox from './TimeCheckbox'
import moment from 'moment'

type Inputs = {
  name: string
  comments: string
  date: string
  password: string
}

interface Props {
  header?: string
  descripion?: string
  removeWrapper?: boolean
}

const AppointmentForm: FC<Props> = ({
  header = 'Book an appointment',
  descripion = 'Fill in the details we need below',
  removeWrapper,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('')

  const formDefaultValues = {
    name: '',
    comments: '',
    date: '',
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

  return (
    <div id='form' className='mx-auto w-full lg:max-w-[600px]'>
      <h6>{header}</h6>
      <p className='opacity-60 mb-8 leading-tight'>{descripion}</p>
      <form
        className={cn(
          'flex flex-col gap-6',
          !removeWrapper && 'bg-card p-6 rounded-2xl'
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
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                type='date'
                label='Schedule Appointment'
                placeholder='Click to set date'
                onValueChange={onChange}
                value={value}
                isRequired
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
        <div className='relative'>
          <Controller
            name='password'
            control={control}
            rules={{
              required:
                'Use a password so you can edit or delete your appointment anytime',
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

        <div className='flex justify-center'>
          <FormButton type='submit' isDisabled={buttonDisabled}>
            Book appointment
          </FormButton>
        </div>
      </form>
    </div>
  )
}

export default AppointmentForm
