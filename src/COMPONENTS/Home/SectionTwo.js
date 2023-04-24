import React from 'react'
import './SectionTwo.css'
import './SectionTwo.css'
import SectionTwoItems from './SectionTwoItems'
const SectionTwo = () => {
  return (
    <div id='sectionTwo' className='sectionTwo'>
        <h2 className='Header'>
        Your choice, we’ll design & stitch, just for you!   </h2>
        <p className='Para'>
        It’s time to say goodbye to adjusting and compromising on clothes that don’t match your style and size!
We are here to design and stitch outfits for you that fits you, not the other way around. </p>
      <SectionTwoItems dName={''}></SectionTwoItems>
    </div>
  )
}

export default SectionTwo