import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [a, setA] = useState(20)


  return (
    <>
    <h1>{a}</h1>
      <button onClick={()=> setA(30)}>Chanche Value</button>
    </>
  )
}

export default App
