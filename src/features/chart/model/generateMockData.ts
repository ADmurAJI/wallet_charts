import type { PricePoint, Timeframe } from '@shared/types/chart'

type TimeframeConfig = {
  points: number
  stepMs: number
  basePrice: number
  drift: number
  volatility: number
  updateIntervalMs: number
}

export const TIMEFRAME_CONFIG: Record<Timeframe, TimeframeConfig> = {
  '15S': {
    points: 200,
    stepMs: 15_000,
    basePrice: 65_200,
    drift: 0.00003,
    volatility: 0.0015,
    updateIntervalMs: 1_000,
  },
  '1M': {
    points: 720,
    stepMs: 60_000,
    basePrice: 64_800,
    drift: 0.00008,
    volatility: 0.0012,
    updateIntervalMs: 10_000,
  },
  '1H': {
    points: 336,
    stepMs: 3_600_000,
    basePrice: 63_400,
    drift: 0.0005,
    volatility: 0.0035,
    updateIntervalMs: 60_000,
  },
  '1D': {
    points: 365,
    stepMs: 86_400_000,
    basePrice: 58_000,
    drift: 0.0018,
    volatility: 0.004,
    updateIntervalMs: 300_000,
  },
}

const createSeededRandom = (seed: number) => {
  let value = seed % 2147483647
  if (value <= 0) {
    value += 2147483646
  }

  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export const generateMockData = (timeframe: Timeframe, seed = 1): PricePoint[] => {
  const config = TIMEFRAME_CONFIG[timeframe]
  const rng = createSeededRandom(seed)

  const startTimestamp = Date.now() - config.stepMs * (config.points - 1)
  const data: PricePoint[] = []
  let price = config.basePrice

  for (let i = 0; i < config.points; i += 1) {
    const timestamp = startTimestamp + i * config.stepMs
    const trend = config.drift * i
    const noise = (rng() - 0.5) * config.volatility * config.basePrice

    price = Math.max(1, price + trend + noise)

    data.push({
      timestamp,
      price: Number(price.toFixed(2)),
    })
  }

  return data
}
