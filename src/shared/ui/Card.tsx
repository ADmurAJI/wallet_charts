import type { HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

export type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...rest }: CardProps) => {
  return <section className={cn('ui-card', className)} {...rest} />
}
