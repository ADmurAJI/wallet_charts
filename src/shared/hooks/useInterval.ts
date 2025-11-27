import { useEffect, useRef } from 'react'

type IntervalFn = () => void

export const useInterval = (callback: IntervalFn, delay: number | null) => {
  const savedCallback = useRef<IntervalFn | undefined>(undefined)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return undefined
    }

    const handler = () => {
      savedCallback.current?.()
    }

    const id = window.setInterval(handler, delay)
    return () => window.clearInterval(id)
  }, [delay])
}
