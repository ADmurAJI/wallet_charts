import type { HTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'

import { cn } from '@shared/lib'

export type SegmentedOption<TValue extends string = string> = {
  label: ReactNode
  value: TValue
  disabled?: boolean
}

export type SegmentedControlProps<TValue extends string = string> = {
  options: SegmentedOption<TValue>[]
  value: TValue
  onValueChange: (value: TValue) => void
  ariaLabel?: string
  className?: string
  optionClassName?: string
} & Pick<HTMLAttributes<HTMLDivElement>, 'id'>

export const SegmentedControl = <TValue extends string = string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
  optionClassName,
  id,
}: SegmentedControlProps<TValue>) => {
  const generatedId = useId()
  const controlId = id ?? `${generatedId}-segment`

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('ui-segmented', className)}
      id={controlId}
    >
      {options.map((option) => {
        const isSelected = option.value === value
        const optionId = `${controlId}-option-${option.value}`

        return (
          <button
            key={option.value}
            id={optionId}
            role="radio"
            type="button"
            aria-checked={isSelected}
            aria-label={
              typeof option.label === 'string' ? option.label : `${option.value} option`
            }
            disabled={option.disabled}
            className={cn('ui-segmented__option', optionClassName)}
            onClick={() => {
              if (!option.disabled) {
                onValueChange(option.value)
              }
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
