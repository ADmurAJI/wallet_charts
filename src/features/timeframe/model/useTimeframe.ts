import { useMemo, useState } from 'react'

import type { Timeframe } from '@shared/types/chart'

const AVAILABLE_TIMEFRAMES: Timeframe[] = ['15S', '1M', '1H', '1D']

export const useTimeframe = (defaultTimeframe: Timeframe = '1H') => {
  const [timeframe, setTimeframe] = useState<Timeframe>(defaultTimeframe)

  const timeframesList = useMemo(() => AVAILABLE_TIMEFRAMES, [])

  return {
    timeframe,
    setTimeframe,
    timeframesList,
  }
}
