import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import { cn } from '@shared/lib'

type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger'
type IconButtonSize = 'sm' | 'md' | 'lg'

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, variant = 'secondary', size = 'md', type = 'button', children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        data-variant={variant}
        data-size={size}
        className={cn('ui-icon-button', className)}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
