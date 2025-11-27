import { createRoot } from 'react-dom/client'

import { App } from '@app/App'
import { AppProvider } from '@app/providers/AppProvider'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element with id "root" was not found.')
}

createRoot(container).render(
  <AppProvider>
    <App />
  </AppProvider>,
)
