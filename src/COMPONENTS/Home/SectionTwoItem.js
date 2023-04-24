import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SectionTwoItem.css'

const SectionTwoItem = ({data}) => {
  const navigate=useNavigate();
  return (
    <div className='sectionTwoItem' onClick={()=>navigate(`/category/${data.name}`)}>
        <img src={data.image}></img>
        <div><p>{data.name}</p></div>
    </div>
  )
}

export default SectionTwoItem