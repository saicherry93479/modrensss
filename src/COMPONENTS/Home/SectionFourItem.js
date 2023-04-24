import React from 'react'
import './SectionFourItem.css'
const SectionFourItem = ({id,data,order}) => {
  return (
    <div className='sectionFourItem' style={order?{flexDirection:'row-reverse'}:{}}>
      <div  >
       <div>
        <div className='sectionFourNumber'>
        <p>{id+1}</p>
        </div>
        <h1>{data.name}</h1>
       </div>
       <p>{data.description}</p>
      </div>
      <img src={data.image}>
      </img>
        

    </div>
  )
}

export default SectionFourItem