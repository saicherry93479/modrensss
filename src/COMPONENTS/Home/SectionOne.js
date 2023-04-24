import React from 'react'
import HeroImageOne from '../../RESOURCES/IMAGES/HeroImageOne.webp'
import './SectionOne.css'

const SectionOne = () => {
  return (
    <div>
        <img src={HeroImageOne} className='heroImage'></img>
    </div>
  )
}

export default SectionOne