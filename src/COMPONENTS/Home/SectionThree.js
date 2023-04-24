import React from 'react'
import Image from '../../RESOURCES/IMAGES/SectionThreeImage.webp'
import './SectionThree.css'
const SectionThree = () => {
  return (
    <div className='sectionThree'>
        <div>
            <h2 className='Header'>Fashion designers who truly understand your style</h2>
            <p className='Para'>
            Can't find the perfect style for you? Or you simply don’t want to fit into any of the boxes? Relax, our in-house designers have got you covered! Because the truth is, we're all special in our own ways! So why shouldn't our outfits be? Our in-house fashion designers are here to design outfits that celebrate your uniqueness, all with a dash of love and care!
            </p>
            <div>
                <p>CONTACT NOW</p>
            </div>
        </div>
        <img src={Image}></img>


    </div>
  )
}

export default SectionThree