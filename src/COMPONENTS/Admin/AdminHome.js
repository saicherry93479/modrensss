import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AdminHome.css'
const AdminHome = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    window.scrollTo({top:0})
   })
  useEffect(()=>{navigate('/admin/products')},[])
  return (
    <div className='adminHome'>
        <div className='leftAdmin'>
          <div onClick={()=>navigate('/admin/products')}><p>Products</p></div>
          <div onClick={()=>navigate('/admin/orders')}><p>Orders</p></div>
        </div>
        <div className='rightAdmin'>
          <Outlet></Outlet>
        </div>
    </div>
  )
}

export default AdminHome