import React, { useContext } from 'react'
import { ek } from './contaxt/story'

function Card() {
   let d = useContext(ek)
  return (
    <div>
        <h2>name:{d.name}</h2>
     <h3>storyline :{d.storyline}</h3>
    </div>
  )
}

export default Card
