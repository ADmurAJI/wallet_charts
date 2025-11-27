import type { HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

type BadgeTone = 'default' | 'success' | 'danger' | 'warning'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
}

export const Badge = ({ className, tone = 'default', ...rest }: BadgeProps) => {
  return <span className={cn('ui-chip', className)} data-tone={tone} {...rest} />
}
