import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@shared/lib'

export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption'

type TextProps<T extends ElementType> = {
  as?: T
  variant?: TextVariant
} & ComponentPropsWithoutRef<T>

const defaultElements: Record<TextVariant, ElementType> = {
  title: 'h2',
  subtitle: 'p',
  body: 'p',
  caption: 'span',
}

export const Text = <T extends ElementType = 'p'>({
  as,
  variant = 'body',
  className,
  ...rest
}: TextProps<T>) => {
  const Component = (as || defaultElements[variant]) as ElementType

  return <Component className={cn('ui-text', className)} data-variant={variant} {...rest} />
}
