import React from 'react'

const CustomBoxProfile = ({text,setState,value,change=false}) => {
  return (
    <div>
        <p>{text}</p>
        <input onChange={change?()=>{}:(e)=>setState(e.target.value)} value={value}></input>

    </div>
  )
}

export default CustomBoxProfile