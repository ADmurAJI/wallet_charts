import type { ReactNode } from 'react'
import { StrictMode } from 'react'

import '@app/styles/globals.css'
import '@app/styles/theme.css'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <StrictMode>
      <div className="app-shell" data-theme="dark">
        {children}
      </div>
    </StrictMode>
  )
}
