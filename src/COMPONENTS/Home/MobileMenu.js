import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cancel from '../../RESOURCES/IMAGES/Cancel'
import Logo from '../../RESOURCES/IMAGES/Logo'

const MobileMenu = ({data,cancelNavBar,showMenu}) => {
    const navigate=useNavigate();
  return (
    <div className='mobileMenu'
    style={showMenu?{display:'block'}:{display:"none"}} 
     onClick={cancelNavBar} >
            
    <div className='actualMobileMenu' id='menuId'>
        <div>
        <div className='logo' onClick={()=>navigate('/')}>
            <Logo ></Logo>
        </div>
        <div className='cancelButton'  onClick={cancelNavBar}>
            <Cancel></Cancel>

        </div>

        </div>
        {
            data.map((dat,key)=><div key={key} className='navLink' onClick={()=>navigate(dat.redirect)}>{dat.name}</div>)
        }
    </div>
</div>

  )
}

export default MobileMenu

{/* <div className='navLink' onClick={()=>navigate('/category/BLOUSE')}><p>Blouse</p></div>
<div className='navLink'onClick={()=>navigate('/category/KURTI')}><p>kurti</p></div>
<div className='navLink' onClick={()=>navigate('/category/LEHENGA')}><p>Lehenga</p></div>
<div className='navLink' onClick={()=>navigate('/category/SAREE')}><p>Saree</p></div>
<div className='navLink' onClick={()=>navigate('/category/SALWAR KAMEEZ')}><p>Salwar Kameez</p></div>
<div className='navLink'><p>Dress</p></div>
<div className='navLink'><p>Jacket</p></div>
<div className='navLink'><p>Jumpsuit</p></div>
<div className='navLink'><p>Shirt</p></div>
<div className='navLink'><p>Skirt</p></div>
<div className='navLink'><p>Trouser</p></div>
<div className='navLink'><p>Top</p></div> */}