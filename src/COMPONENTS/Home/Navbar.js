import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../RESOURCES/IMAGES/Logo'
import './Navbar.css'
import Cart from '../../RESOURCES/IMAGES/Cart'
import Account from '../../RESOURCES/IMAGES/Account'
import Menu from '../../RESOURCES/IMAGES/Menu'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { Store } from '../../App'


const menuData=[{name:"BLOUSE",redirect:"/category/BLOUSE"},
{name:"KURTI",redirect:"/category/KURTI"}];

const adminData=[{name:"products",redirect:"/admin/products"},{name:"orders",redirect:'/admin/orders'}]


const Navbar = () => {
   
    // const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false)
    const navigate=useNavigate();
    const location =useLocation()
    const {uid}=useContext(Store)




    const cancelNavBar=()=>{
        let menu=document.getElementById('menuId')
        menu.classList.add("menuCancelClass")
        
        setTimeout(()=>{
            setShowMenu(false);
            menu.classList.remove("menuCancelClass")},1000)
        
    }
    const ordersHandler=()=>{
        if(uid){
            navigate('/orders')
            return
        }
        navigate('/login')

    }
    const profileHandler=()=>{
        console.log('uid is in navbarv ',uid)
        if(uid){
            console.log('uid came')
            
            navigate('/profile')
            return

        }else{
            console.log('not came ')
        }
        navigate('/login')
    }
    
  return (
    <div className='navbar'>
        <div className='navbarTop'>
            <div className='menu' onClick={()=>setShowMenu(true)}>
            <Menu width={'100%'} height={'100%'}></Menu>
        </div>
        <div className='logo' onClick={()=>navigate('/')}>
            <Logo ></Logo>
        </div>
        <div className='navItems'>
            <p onClick={()=>{navigate('/category/KURTI')}}>Kurti</p>
            <p onClick={()=>{navigate('/category/SAREE')}}>Saree</p>
            <p onClick={()=>{navigate('/category/LEHANGA')}}>Lehenga</p>
           

        </div>
        <div className='navAuth'>
            <div onClick={ordersHandler}>
                <Cart></Cart>
            </div>
            <div onClick={profileHandler}>
                <Account></Account>
            </div>
        </div>
        </div>
        <div className='navbarDown'>

        </div>
       <MobileMenu data={location.pathname.includes('/admin')?adminData:menuData} cancelNavBar={cancelNavBar} showMenu={showMenu}></MobileMenu>
       
    </div>
  )
}




export default Navbar