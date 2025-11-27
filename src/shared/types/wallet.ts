export type WalletStatus = 'disconnected' | 'connecting' | 'connected'

export type Wallet = {
  address: string
  balance: number
  currency: string
  status: WalletStatus
}

export type WalletState = {
  status: WalletStatus
  address: string | null
  balance: number | null
  currency: string
}
