import { TextAreaProps, Textarea } from '@nextui-org/react'
import React, { FC } from 'react'

interface Props extends TextAreaProps {
  hasError?: boolean
}

const FormTextArea: FC<Props> = ({ hasError, ...TextAreaProps }) => {
  const customStyles = {
    label: 'text-foreground',
    inputWrapper: [
      'bg-card-light data-[hover=true]:bg-slate-700 group-data-[focus=true]:bg-card-light',
      hasError ? 'border border-danger' : null,
    ],
  }

  return (
    <Textarea
      label={TextAreaProps.label}
      placeholder={TextAreaProps.placeholder}
      classNames={customStyles}
      size='md'
      variant='flat'
      onValueChange={TextAreaProps.onValueChange}
      value={TextAreaProps.value}
      isRequired={TextAreaProps.isRequired}
      isMultiline
    />
  )
}

export default FormTextArea
