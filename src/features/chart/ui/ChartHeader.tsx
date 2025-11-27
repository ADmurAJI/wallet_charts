import { formatCurrency, formatPercent } from '@shared/lib'
import { Badge, IconButton, Text } from '@shared/ui'

import styles from './ChartHeader.module.css'

type ChartHeaderProps = {
  price: number
  changePercent: number
}

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3.3 9.6 9.1l-6 .5 4.6 4-1.4 6 5.2-3.2 5.2 3.2-1.4-6 4.6-4-6-.5z"
      fill="currentColor"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M19.4 13.3c.04-.43.1-.85.1-1.3s-.06-.87-.1-1.3l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a8.35 8.35 0 0 0-2.25-1.3l-.38-2.64a.5.5 0 0 0-.5-.44h-4a.5.5 0 0 0-.5.44l-.38 2.64a8.64 8.64 0 0 0-2.24 1.3l-2.5-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.6 10.7c-.04.43-.1.85-.1 1.3s.06.87.1 1.3L2.5 14.95a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.5-1a8.64 8.64 0 0 0 2.24 1.3l.38 2.64a.5.5 0 0 0 .5.44h4a.5.5 0 0 0 .5-.44l.38-2.64c.83-.3 1.6-.74 2.25-1.3l2.48 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64zM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5z"
      fill="currentColor"
    />
  </svg>
)

export const ChartHeader = ({ price, changePercent }: ChartHeaderProps) => {
  const formattedPrice = formatCurrency(price || 0, { currency: 'USD', maximumFractionDigits: 2 })
  const formattedChange = formatPercent(changePercent / 100, {
    signDisplay: 'always',
    maximumFractionDigits: 2,
  })
  const tone = changePercent >= 0 ? 'success' : 'danger'

  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <span className={styles.caption}>Net Asset Value</span>
        <Text variant="title" className={styles.price}>
          {formattedPrice}
        </Text>
        <Badge tone={tone} className={styles.change}>
          {formattedChange}
        </Badge>
      </div>
      <div className={styles.actions}>
        <IconButton label="Add to favorites" variant="ghost">
          <StarIcon />
        </IconButton>
        <IconButton label="Open chart settings" variant="ghost">
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  )
}
