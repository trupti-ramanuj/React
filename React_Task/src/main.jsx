import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./contaxt/UserContext";
import './index.css'
import App from './App'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserProvider>
    <App />
  </UserProvider>
  </StrictMode>,
)
