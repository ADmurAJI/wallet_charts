import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { cn } from '@shared/lib'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        data-variant={variant}
        data-size={size}
        className={cn('ui-button', className)}
        {...rest}
      />
    )
  },
)

Button.displayName = 'Button'
