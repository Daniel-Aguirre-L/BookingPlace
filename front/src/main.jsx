import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import '@fontsource/montserrat'; 
import '@fontsource/roboto'; 
import MessageProviders from './Components/providers/MessageProviders';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProviders>
      <App />
    </MessageProviders>
  </StrictMode>,
)
