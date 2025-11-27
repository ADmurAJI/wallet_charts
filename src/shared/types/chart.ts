// Supported chart granularities:
// 15S - 15 second resolution, 200 points retained (~50 min depth), ticks update every 1s
// 1M  - 1 minute resolution, 720 points retained (~12 h depth), ticks update every 10s
// 1H  - 1 hour resolution, 336 points retained (~14 d depth), ticks update every minute
// 1D  - 1 day resolution, 365 points retained (~1 yr depth), ticks update every 5 minutes
export type Timeframe = '15S' | '1M' | '1H' | '1D'

// Every price point stores a unix timestamp (ms) and the price snapshot at that instant.
export type PricePoint = {
  timestamp: number
  price: number
}
