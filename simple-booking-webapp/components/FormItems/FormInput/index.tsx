import { Input, InputProps } from '@nextui-org/react'
import { FC } from 'react'

interface Props extends InputProps {
  hasError?: boolean
}

const FormInput: FC<Props> = ({ hasError, ...InputProps }) => {
  const customStyles = {
    label: 'text-foreground',
    inputWrapper: [
      'bg-card-light data-[hover=true]:bg-slate-700 group-data-[focus=true]:bg-card-light',
      hasError ? 'border border-danger' : null,
    ],
  }

  return (
    <Input
      label={InputProps.label}
      placeholder={InputProps.placeholder}
      classNames={customStyles}
      type={InputProps.type}
      size='md'
      variant='flat'
      onValueChange={InputProps.onValueChange}
      value={InputProps.value}
      isRequired={InputProps.isRequired}
    />
  )
}

export default FormInput
