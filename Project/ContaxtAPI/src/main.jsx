
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContaxt from './contaxt/UserContaxt.jsx'
import Story from './contaxt/story.jsx'

createRoot(document.getElementById('root')).render(
  <Story>
 <UserContaxt>
    <App />
 </UserContaxt>
 </Story>
)
