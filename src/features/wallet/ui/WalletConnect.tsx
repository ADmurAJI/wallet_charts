import { formatCurrency } from '@shared/lib'
import type { WalletStatus } from '@shared/types/wallet'
import { Badge, Button, Card, Text } from '@shared/ui'

import styles from './WalletConnect.module.css'

type WalletConnectProps = {
  status: WalletStatus
  address: string | null
  balance: number | null
  currency: string
  onConnect: () => void
  onDisconnect: () => void
  onRefreshBalance: () => void
}

const WalletIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" role="img" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="wallet-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="var(--accent-primary)" />
        <stop offset="100%" stopColor="var(--accent-secondary)" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="24" height="16" rx="8" fill="url(#wallet-gradient)" />
    <rect x="20" y="14" width="6" height="4" rx="2" fill="var(--bg-primary)" opacity="0.85" />
  </svg>
)

const statusCopy: Record<WalletStatus, string> = {
  disconnected: 'Wallet disconnected',
  connecting: 'Connecting...',
  connected: 'Wallet connected',
}

export const WalletConnect = ({
  status,
  address,
  balance,
  currency,
  onConnect,
  onDisconnect,
  onRefreshBalance,
}: WalletConnectProps) => {
  const isConnected = status === 'connected'
  const isConnecting = status === 'connecting'
  const formattedBalance = balance !== null ? formatCurrency(balance, { currency }) : '--'
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'

  return (
    <Card className={styles.root}>
      <div className={styles.header}>
        <div className={styles.identity}>
          <div className={styles.icon}>
            <WalletIcon />
          </div>
          <div>
            <Text variant="caption">Wallet</Text>
            <Text variant="subtitle">{statusCopy[status]}</Text>
            <p className={styles.address}>{shortAddress}</p>
          </div>
        </div>
        {isConnected ? <Badge tone="success">Live</Badge> : <Badge tone="warning">Idle</Badge>}
      </div>

      <div className={styles.body}>
        <Text variant="title">{formattedBalance}</Text>
        <div className={styles.status}>
          <Badge tone={isConnected ? 'success' : 'warning'}>
            {isConnected ? 'Connected' : isConnecting ? 'Syncing' : 'Idle'}
          </Badge>
        </div>
      </div>

      <div className={styles.actions}>
        {isConnected ? (
          <>
            <Button variant="secondary" onClick={onRefreshBalance}>
              Refresh
            </Button>
            <Button variant="ghost" onClick={onDisconnect}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={onConnect} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </Card>
  )
}
