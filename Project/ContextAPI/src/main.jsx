
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import Story from './context/Story.jsx'

createRoot(document.getElementById('root')).render(
  <Story>
 <UserContext>
    <App />
 </UserContext>
 </Story>
)
