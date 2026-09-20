import { useEffect, useState } from 'react'
import './App.css'

function App() {
 let [color,setColor]=useState("blue")


 let [count,setCount]=useState(0)

useEffect(()=>{
  setTimeout(()=>{
   setCount(++count)
  },1000)
 })
  return (
    <>
      <h1>My favorite color is {color}</h1>

      <button onClick={()=>setColor("black")}>Black</button>

      <h2>{count}</h2>
      <button onClick={()=>{setCount(++count)}}>Increament</button>
      <button  onClick={()=>{setCount(--count)}}>Dicreament</button>

      <h1>{count}</h1>
    </>
  )
}

export default App
