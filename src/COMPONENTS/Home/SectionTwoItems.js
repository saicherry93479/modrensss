import React from 'react'
import { SectionTwoData } from '../Utils/HomeData'
import SectionTwoItem from './SectionTwoItem'

// dname---dont show name
const SectionTwoItems = ({dName}) => {
  return (
    <div className='sectionTwoItems'>
    {
        SectionTwoData.map((data,key)=>data.name===dName?<></>:<SectionTwoItem data={data}></SectionTwoItem>)
    }

</div>
  )
}

export default SectionTwoItems