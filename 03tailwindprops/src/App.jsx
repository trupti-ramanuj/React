import { useState } from 'react'
import Card from './components/Card'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='bg-green-400 text-black p-4 rounded-xl'>Tailwind test</h1>
    <Card name="Sunflower"/>
    <Card price="0.02"/>

    </>
  )
}

export default App
