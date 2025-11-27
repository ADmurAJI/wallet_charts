import type { Timeframe } from '@shared/types/chart'
import { SegmentedControl } from '@shared/ui'

import styles from './TimeframeTabs.module.css'

type TimeframeTabsProps = {
  value: Timeframe
  onChange: (value: Timeframe) => void
  items: Timeframe[]
}

export const TimeframeTabs = ({ value, onChange, items }: TimeframeTabsProps) => {
  return (
    <SegmentedControl
      ariaLabel="Select timeframe"
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
      value={value}
      onValueChange={onChange}
      className={styles.root}
      optionClassName={styles.option}
    />
  )
}
