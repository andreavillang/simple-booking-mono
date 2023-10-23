import React, { FC } from 'react'
import { Button, ButtonProps } from '@nextui-org/react'
import cn from 'classnames'

interface Props extends ButtonProps {
  fullWidth?: boolean
}

const FormButton: FC<Props> = ({
  fullWidth,
  color = 'primary',
  ...ButtonProps
}) => {
  return (
    <Button
      radius='sm'
      size='md'
      variant={ButtonProps.variant}
      color={color}
      disabled={ButtonProps.disabled}
      isLoading={ButtonProps.isLoading}
      endContent={ButtonProps.endContent}
      startContent={ButtonProps.startContent}
      as={ButtonProps.as}
      href={ButtonProps.href}
      target={ButtonProps.target}
      onPress={ButtonProps.onPress}
      className={cn(
        fullWidth && 'w-full',
        'text-sm font-medium tracking-[1.25px] uppercase px-6'
      )}
    >
      {ButtonProps.children}
    </Button>
  )
}

export default FormButton
