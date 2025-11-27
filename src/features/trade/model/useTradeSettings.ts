import { useCallback, useMemo, useState } from 'react'

export type TradeSide = 'long' | 'short'

type UseTradeSettingsOptions = {
  initialMargin?: number
  initialLeverage?: number
  initialSide?: TradeSide | null
}

const DEFAULT_MARGIN = 10
const DEFAULT_LEVERAGE = 10

export const useTradeSettings = ({
  initialMargin = DEFAULT_MARGIN,
  initialLeverage = DEFAULT_LEVERAGE,
  initialSide = null,
}: UseTradeSettingsOptions = {}) => {
  const [margin, setMarginState] = useState<number>(initialMargin)
  const [leverage, setLeverageState] = useState<number>(initialLeverage)
  const [side, setSideState] = useState<TradeSide | null>(initialSide)

  const setMargin = useCallback((value: number) => {
    setMarginState(Math.max(0, value))
  }, [])

  const setLeverage = useCallback((value: number) => {
    setLeverageState(Math.max(1, value))
  }, [])

  const setSide = useCallback((nextSide: TradeSide | null) => {
    setSideState(nextSide)
  }, [])

  return useMemo(
    () => ({
      margin,
      leverage,
      side,
      setMargin,
      setLeverage,
      setSide,
    }),
    [margin, leverage, side, setMargin, setLeverage, setSide],
  )
}
