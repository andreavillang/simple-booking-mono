import React, { FC, useState } from 'react'
import cn from 'classnames'

interface Props {
  label: string
  isSelected: boolean
  handleOnSelect: () => void
}

const TimeCheckbox: FC<Props> = ({ label, isSelected, handleOnSelect }) => {
  return (
    <div
      className={cn(
        isSelected
          ? 'bg-card-lightest outline outline-primary'
          : 'bg-card-light',
        'cursor-pointer px-4 pt-1 pb-1.5 rounded-full'
      )}
      onClick={handleOnSelect}
    >
      <small className={cn(!isSelected ? 'opacity-60' : 'font-bold')}>
        {label}
      </small>
    </div>
  )
}

export default TimeCheckbox
