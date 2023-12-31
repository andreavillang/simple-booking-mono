import { FC } from 'react'
import { Input, InputProps } from '@nextui-org/react'

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
    <Input classNames={customStyles} size='md' variant='flat' {...InputProps} />
  )
}

export default FormInput
