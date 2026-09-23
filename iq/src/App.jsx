import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState(1)
  const mf = value * 5;

  const multiplay=()=>{
    setValue(value+1);
  }

  return (
    <>
      <h1>Main value:{value}</h1>
      <button onClick={multiplay}>Click to multiply by 5</button>
      <h1>Multiplayed value:{mf}</h1>
    </>
  )
}

export default App
