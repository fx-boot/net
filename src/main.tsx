import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/spatial.css'
import './styles/cinema.css'
import './styles/projection.css'
import './styles/sensory.css'
import './styles/typography.css'
import './styles/geo-aesthetics.css'

import App from './app/App.tsx'
import { LanguageProvider } from './i18n/LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider><App /></LanguageProvider>
  </StrictMode>,
)
