import React, { useState } from 'react'
import DownArrow from '../../RESOURCES/IMAGES/DownArrow'
import './SectionFiveItem.css'

const SectionFiveitem = ({question,answer}) => {
    const [show,setShow]=useState(false)
  return (
    <div className='sectionFiveItem' style={show?{background:"#F9F8F3",transition:'background 1s ease'}:{}} onClick={()=>setShow(p=>!p)}>
        <div className='sectionFiveItemDiv'>
            <p>{question}</p>
            <div style={show?{transform:"rotateZ(180deg)"}:{}} ><DownArrow></DownArrow></div>
        </div>
        <div style={show?{display:"block"}:{display:"none"}}>
            <p className='sectionFiveAnswer'>{answer}</p>
        </div>

    </div>
  )
}

export default SectionFiveitem