import type { TradeSide } from '@features/trade/model/useTradeSettings'
import { Button, Card, Text } from '@shared/ui'

import styles from './TradeControls.module.css'

type TradeControlsProps = {
  margin: number
  leverage: number
  side: TradeSide | null
  onMarginChange: (value: number) => void
  onLeverageChange: (value: number) => void
  onSideChange: (value: TradeSide | null) => void
}

export const TradeControls = ({
  margin,
  leverage,
  side,
  onMarginChange,
  onLeverageChange,
  onSideChange,
}: TradeControlsProps) => {
  return (
    <Card className={styles.root}>
      <div className={styles.inputs}>
        <div className={styles.control}>
          <Text variant="caption">Margin (k USD)</Text>
          <div className={styles.field}>
            <input
              className={styles.slider}
              type="range"
              min={1}
              max={100}
              value={margin}
              onChange={(event) => onMarginChange(Number(event.target.value))}
              aria-label="Margin size in thousands"
            />
            <Text variant="subtitle">{margin.toFixed(0)}k</Text>
          </div>
        </div>
        <div className={styles.control}>
          <Text variant="caption">Leverage</Text>
          <div className={styles.field}>
            <input
              className={styles.slider}
              type="range"
              min={1}
              max={50}
              value={leverage}
              onChange={(event) => onLeverageChange(Number(event.target.value))}
              aria-label="Leverage multiplier"
            />
            <Text variant="subtitle">{leverage.toFixed(0)}&times;</Text>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="success"
          data-active={side === 'long'}
          onClick={() => onSideChange(side === 'long' ? null : 'long')}
          aria-pressed={side === 'long'}
        >
          Long
        </Button>
        <Button
          variant="danger"
          data-active={side === 'short'}
          onClick={() => onSideChange(side === 'short' ? null : 'short')}
          aria-pressed={side === 'short'}
        >
          Short
        </Button>
      </div>
    </Card>
  )
}
