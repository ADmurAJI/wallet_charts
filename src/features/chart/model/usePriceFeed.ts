import { useEffect, useMemo, useState } from 'react'

import { useInterval } from '@shared/hooks'
import type { PricePoint, Timeframe } from '@shared/types/chart'

import { generateMockData, TIMEFRAME_CONFIG } from './generateMockData'

type PriceFeedState = {
  data: PricePoint[]
  currentPrice: number
  changePercent: number
  high: number
  low: number
}

const computeMetrics = (series: PricePoint[]): Omit<PriceFeedState, 'data'> => {
  if (series.length === 0) {
    return {
      currentPrice: 0,
      changePercent: 0,
      high: 0,
      low: 0,
    }
  }

  const currentPrice = series[series.length - 1]?.price ?? 0
  const startPrice = series[0]?.price ?? currentPrice

  let high = Number.NEGATIVE_INFINITY
  let low = Number.POSITIVE_INFINITY

  for (const { price } of series) {
    if (price > high) {
      high = price
    }
    if (price < low) {
      low = price
    }
  }

  const changePercent = startPrice > 0 ? ((currentPrice - startPrice) / startPrice) * 100 : 0

  return {
    currentPrice,
    changePercent,
    high,
    low,
  }
}

export const usePriceFeed = (timeframe: Timeframe) => {
  const [series, setSeries] = useState<PricePoint[]>(() => generateMockData(timeframe))

  useEffect(() => {
    setSeries(generateMockData(timeframe))
  }, [timeframe])

  const config = TIMEFRAME_CONFIG[timeframe]

  useInterval(() => {
    setSeries((prev) => {
      const lastPoint = prev[prev.length - 1]
      const fallbackTimestamp = Date.now()
      const nextTimestamp = (lastPoint?.timestamp ?? fallbackTimestamp) + config.stepMs
      const lastPrice = lastPoint?.price ?? config.basePrice
      const noise = (Math.random() - 0.5) * config.volatility * 0.5
      const drift = config.drift * 10
      const nextPrice = Math.max(1, Number((lastPrice * (1 + drift + noise)).toFixed(2)))
      const nextPoint: PricePoint = {
        timestamp: nextTimestamp,
        price: nextPrice,
      }

      const maxLength = config.points
      const nextSeries =
        prev.length >= maxLength ? [...prev.slice(prev.length - maxLength + 1), nextPoint] : [...prev, nextPoint]

      return nextSeries
    })
  }, config.updateIntervalMs)

  const metrics = useMemo(() => computeMetrics(series), [series])

  return {
    data: series,
    currentPrice: metrics.currentPrice,
    changePercent: metrics.changePercent,
    high: metrics.high,
    low: metrics.low,
  }
}
