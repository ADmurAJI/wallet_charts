import { useCallback, useState } from 'react'

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback((next?: boolean) => {
    setValue((prev) => (typeof next === 'boolean' ? next : !prev))
  }, [])

  return [value, toggle] as const
}
