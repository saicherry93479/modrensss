import React from 'react'
import { SectionFourData } from '../Utils/HomeData'
import './SectionFour.css'
import SectionFourItem from './SectionFourItem'
const SectionFour = () => {
  return (
    <div className='sectionFour'>
        <h2 className='Header'>Tailoring made easy, just for you</h2>
        <p className='Para'>You deserve clothes that make YOU feel confident, comfortable, and empowered. We are here to make outfits just for you that make you feel so and that too in three simple steps.</p>
        <div>
          {SectionFourData.map((data,key)=><SectionFourItem data={data} id={key} order={key%2===0?false:true}></SectionFourItem>)}
        </div>
    </div>
  )
}

export default SectionFour