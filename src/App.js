import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import Logo from '../src/RESOURCES/IMAGES/Logo.js'
import Navbar from './COMPONENTS/Home/Navbar'
import Home from './COMPONENTS/Home/Home'
import { Route,HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import ProductsHome from './COMPONENTS/Products/ProductsHome'
import SectionSix from './COMPONENTS/Home/SectionSix'

import AdminHome from './COMPONENTS/Admin/AdminHome'
import AdminProducts from './COMPONENTS/Admin/AdminProducts'
import NewProduct from './COMPONENTS/Admin/NewProduct'
import Login from './COMPONENTS/Auth/Login'
import Sample from './COMPONENTS/Auth/Sample'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './COMPONENTS/Auth/firebase'
import Profile from './COMPONENTS/Auth/Profile'
import { collection, doc, getDoc } from 'firebase/firestore'
import Product from './COMPONENTS/Product/Product'
import PopUp from './COMPONENTS/Utils/PopUp'
import Orders from './COMPONENTS/Orders/Orders'
import AdminOrders from './COMPONENTS/Admin/AdminOrders'
import OrderPop from './COMPONENTS/Utils/OrderPop'
// import Sms from './COMPONENTS/Utils/Sms'
import ContactUs from './COMPONENTS/Utils/ContactUs'

export const Store=createContext()

const App = () => {


  const [message,setMessage]=useState('')
  const [showMessage,setShowMessage]=useState(false)
  const [messageColor,setMessageColor]=useState('#c379f7')
  const [uid,setUid]=useState('')
  const [user,setUser]=useState({})
  const [updateUser,setUpdateUser]=useState(false)
  const [showPopUp,setShowPopUp]=useState(false)
  const [popUpMessage,setPopUpMessage]=useState('')
  const [popUpRedirect,setPopUpRedirect]=useState('/')
  const [isConFirm,setIsConfirm]=useState(false)
  const [showOrderPop,setShowOrderPop]=useState(false)
  const [adminOrderId,setAdminOrderId]=useState('')
  const [updateOrders,setUpdateOrders]=useState(false)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //  user.uid;
        console.log("in app.js is user is ",user)
        setUid(user.uid)
        console.log('uid is in app js  ',uid)
        
        // ...
      } else {
        // User is signed out
        setUid('')
        console.log('signout hai ')
        // ...
      }
    });
  })
  useEffect(()=>{
    if(uid){
      console.log("uid is ",uid)
      getUser()
    }

  },[uid,updateUser])

  const getUser=async ()=>{
    if(!uid){
      console.log('there is no uid to get user')
      return
    }
    console.log("getUser in app.js  and uid is ",uid)
    const colRef=collection(db, "users")
    const docRef=doc(colRef,uid)
    try{
      const document=await getDoc(docRef)
      console.log("got the documnet sucessfully ",document.data())
      setUser(document.data())


    }catch(e){
      console.log("errror in getting the user")
    }


  }
  const popUpHandlerFunction=(message,redirect,shPopUp,confirm=false)=>{
    setShowPopUp(shPopUp)
    setPopUpMessage(message)
    setPopUpRedirect(redirect)
    setIsConfirm(confirm)

  }



  const messageHandlerFunction=(m,mc)=>{
    console.log('hey cam ',m,' ',mc)

    setMessage(m)
    setShowMessage(true)
    setMessageColor(p=>mc)

    console.log('color is ',messageColor,' and ',mc)

    setTimeout(()=>{
      setMessage('')
      setShowMessage(false)
      // setMessageColor('red')

    },3000)

  }

  const storeProvider={
    messageHandlerFunction:messageHandlerFunction,
    uid:uid,
    user:user,
    setUpdateUser:setUpdateUser,
    popUpHandlerFunction:popUpHandlerFunction,
    setShowOrderPop:setShowOrderPop,
    adminOrderId:adminOrderId,
    setAdminOrderId:setAdminOrderId,
    updateOrders:updateOrders,
    setUpdateOrders:setUpdateOrders
  }


  
 
  return (
    <Store.Provider value={storeProvider}>
    <Router>
      {showOrderPop===true?<OrderPop></OrderPop>:<></>}
      {showPopUp===true?<PopUp isConFirm={isConFirm} message={popUpMessage} redirect={popUpRedirect} isConfirm={isConFirm}></PopUp>:<></>}
     {showMessage?<div  className='messageLogin' style={{backgroundColor:messageColor}}>{message}</div>:<></>}
     <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/category/:categoryname' element={<ProductsHome></ProductsHome>}></Route>
        <Route path='/sample' element={<Sample></Sample>}></Route>
        <Route path='/admin' element={user?user.isAdmin===true?<AdminHome></AdminHome>:<div>Not Admin</div>:<></>}>
          <Route path='products' element={<AdminProducts></AdminProducts>}></Route>
          <Route path='newProduct' element={<NewProduct></NewProduct>}></Route>
          <Route path='orders' element={<AdminOrders></AdminOrders>}></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/product/:id' element={<Product></Product>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/sms' element={<ContactUs></ContactUs>}></Route>

      </Routes>
      <SectionSix></SectionSix>
    </Router>
    </Store.Provider>
  )
}

export default App