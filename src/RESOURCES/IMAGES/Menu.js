import React from 'react'
import './Menu.css'
const Menu = ({width,height}) => {
  return (
    <svg className='menuSvg' 
    width={width}
    height={height} 
    //  color='red'
    
      viewBox="0 0 24 24"
      stroke-width="1.5" stroke="var(--para-color-desktop--)" 
      class="w-7 sm:w-8 text-primary-gray-black">
        <path stroke-linecap="round" stroke-linejoin="round"
         d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5">
            </path></svg>
  )
}

export default Menu