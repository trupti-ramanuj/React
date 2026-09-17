import React from 'react'

function Card(props) {
  return (
<div className="card">
    <img src={props.imageUrl} alt="" />
    <h1>{props.name}</h1>
    <h3>{props.price}</h3>
</div>
  )
}

export default Card
