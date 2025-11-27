import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { WalletState } from '@shared/types/wallet'

const INITIAL_STATE: WalletState = {
  status: 'disconnected',
  address: null,
  balance: null,
  currency: 'USD',
}

const createAddress = () => {
  const chars = 'abcdef0123456789'
  const length = 10
  let result = '0x'
  for (let i = 0; i < length; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const createBalance = () => {
  const base = Math.random() * 5
  const scaled = base * 10 ** (Math.floor(Math.random() * 4) + 2)
  return Math.round(scaled) / 100
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>(INITIAL_STATE)
  const pendingTimeout = useRef<number | null>(null)

  const clearPending = useCallback(() => {
    if (pendingTimeout.current !== null) {
      window.clearTimeout(pendingTimeout.current)
      pendingTimeout.current = null
    }
  }, [])

  const connect = useCallback(() => {
    if (state.status !== 'disconnected') {
      return
    }

    setState((prev) => ({
      ...prev,
      status: 'connecting',
    }))

    pendingTimeout.current = window.setTimeout(() => {
      setState({
        status: 'connected',
        address: createAddress(),
        balance: createBalance(),
        currency: 'USD',
      })
      pendingTimeout.current = null
    }, 1200)
  }, [state.status])

  const disconnect = useCallback(() => {
    clearPending()
    setState({ ...INITIAL_STATE })
  }, [clearPending])

  const refreshBalance = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'connected') {
        return prev
      }

      return {
        ...prev,
        balance: createBalance(),
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      clearPending()
    }
  }, [clearPending])

  const api = useMemo(
    () => ({
      status: state.status,
      address: state.address,
      balance: state.balance,
      currency: state.currency,
      connect,
      disconnect,
      refreshBalance,
    }),
    [state, connect, disconnect, refreshBalance],
  )

  return api
}
