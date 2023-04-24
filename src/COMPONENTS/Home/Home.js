import React, { useEffect } from 'react'
import './Home.css'
import SectionFive from './SectionFive'
import SectionFour from './SectionFour'
import SectionOne from './SectionOne'
import SectionSix from './SectionSix'
import SectionThree from './SectionThree'
import SectionTwo from './SectionTwo'

/*
DESCRIPTION ON COMPONENT

*/

const Home = () => {
  useEffect(()=>{
    window.scrollTo({top:0})
   })
  return (
    <div>
        <SectionOne></SectionOne>
        <SectionTwo></SectionTwo>
        <SectionThree></SectionThree>
        <SectionFour></SectionFour>
        <SectionFive></SectionFive>
       
    </div>
  )
}

export default Home