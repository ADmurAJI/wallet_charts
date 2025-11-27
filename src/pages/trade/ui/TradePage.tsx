import { useMemo, useState } from 'react'

import { usePriceFeed } from '@features/chart/model/usePriceFeed'
import { ChartHeader } from '@features/chart/ui/ChartHeader'
import { PriceChart } from '@features/chart/ui/PriceChart'
import { useTimeframe } from '@features/timeframe/model/useTimeframe'
import { TimeframeTabs } from '@features/timeframe/ui/TimeframeTabs'
import { useTradeSettings } from '@features/trade/model/useTradeSettings'
import { TradeControls } from '@features/trade/ui/TradeControls'
import { useWallet } from '@features/wallet/model/useWallet'
import { WalletConnect } from '@features/wallet/ui/WalletConnect'
import { formatCurrency } from '@shared/lib'

type TradePair = {
  symbol: string
  name: string
  exchange: string
}

const TRADE_PAIRS: TradePair[] = [
  { symbol: 'BTC/USDC', name: 'Bitcoin / USD Coin', exchange: 'Deribit' },
  { symbol: 'ETH/USDC', name: 'Ethereum / USD Coin', exchange: 'Binance' },
  { symbol: 'SOL/USDC', name: 'Solana / USD Coin', exchange: 'Coinbase' },
]

const TradeHeader = ({
  selectedPair,
  onPairChange,
}: {
  selectedPair: TradePair
  onPairChange: (symbol: string) => void
}) => {
  return (
    <div className="trade-header__pair">
      <div>
        <p className="eyebrow">Trading pair</p>
        <h1>{selectedPair.symbol}</h1>
        <p>{selectedPair.name}</p>
      </div>
      <label className="trade-pair-select">
        <span className="sr-only">Select trading pair</span>
        <select value={selectedPair.symbol} onChange={(event) => onPairChange(event.target.value)}>
          {TRADE_PAIRS.map((pair) => (
            <option key={pair.symbol} value={pair.symbol}>
              {pair.symbol} / {pair.exchange}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export const TradePage = () => {
  const { timeframe, setTimeframe, timeframesList } = useTimeframe()
  const wallet = useWallet()
  const priceFeed = usePriceFeed(timeframe)
  const tradeSettings = useTradeSettings()
  const [pairSymbol, setPairSymbol] = useState<string>(TRADE_PAIRS[0]?.symbol ?? '')

  const selectedPair = useMemo(
    () => TRADE_PAIRS.find((pair) => pair.symbol === pairSymbol) ?? TRADE_PAIRS[0],
    [pairSymbol],
  )

  return (
    <main className="trade-page">
      <header className="trade-header">
        <TradeHeader selectedPair={selectedPair} onPairChange={setPairSymbol} />
        <WalletConnect
          status={wallet.status}
          address={wallet.address}
          balance={wallet.balance}
          currency={wallet.currency}
          onConnect={wallet.connect}
          onDisconnect={wallet.disconnect}
          onRefreshBalance={wallet.refreshBalance}
        />
      </header>

      <section className="glass-card chart-shell">
        <ChartHeader price={priceFeed.currentPrice} changePercent={priceFeed.changePercent} />
        <TimeframeTabs value={timeframe} onChange={setTimeframe} items={timeframesList} />
        <PriceChart
          data={priceFeed.data}
          currentPrice={priceFeed.currentPrice}
          changePercent={priceFeed.changePercent}
        />
        <div className="chart-meta">
          <div>
            <p className="eyebrow">High ({timeframe})</p>
            <strong>{formatCurrency(priceFeed.high || 0)}</strong>
          </div>
          <div>
            <p className="eyebrow">Low ({timeframe})</p>
            <strong>{formatCurrency(priceFeed.low || 0)}</strong>
          </div>
        </div>
      </section>

      <TradeControls
        margin={tradeSettings.margin}
        leverage={tradeSettings.leverage}
        side={tradeSettings.side}
        onMarginChange={tradeSettings.setMargin}
        onLeverageChange={tradeSettings.setLeverage}
        onSideChange={tradeSettings.setSide}
      />
    </main>
  )
}

export default TradePage
