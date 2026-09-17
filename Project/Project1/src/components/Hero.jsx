import React from 'react'
import Card from './Card'
import Image1 from '../assets/image1.jpg'


function Hero() {
  return (
 <div className="hero">
  <Card imageUrl={Image1} name="BMW" price="Rs 1.9cr"/>
  <Card  imageUrl={Image1} name="Range Rover" price="Rs 2.9cr"/>
  <Card  imageUrl={Image1} name="Lamborghini" price="Rs 3.9cr"/>
    {/* <img src={Image1} alt="image1" width="300px" />
    <img src={Image2} alt="image2" width="300px" />
    <img src={Image3} alt="image3" width="300px" /> */}
 </div>
  )
}

export default Hero
