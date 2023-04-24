import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Store } from '../../App'
import { db } from '../Auth/firebase'
import './Product.css'

const Product = () => {
    const [product,setProduct]=useState(null)
    const [currentUrl,setCurrentUrl]=useState('')
    const {state}=useLocation()
    const {id}=useParams()

    const {popUpHandlerFunction,uid}=useContext(Store)

    useEffect(()=>{
        window.scrollTo({top:0})
       })
    
    useEffect(()=>{
        if(state){
            setProduct(state)
            setCurrentUrl(state.productImages[0])
        }else{
            getProduct()


        }
        // console.log('product is  product ',product)
        
    },[])


    const orderClickHandler=()=>{
        console.log("uid is ",uid)
        if(!uid){
            popUpHandlerFunction('Please Login Before Placing Order.Click Continue to Login','/login',true)

        }else{
            popUpHandlerFunction('confirm the order by clicking confirm ','/orders',true,true)
        }
    }
    const getProduct=async ()=>{

        const colRef=collection(db,'products')
        const docRef=doc(colRef,id)
        try{
            const document=await getDoc(docRef) 
            if(document.exists()){
                const data={...document.data(),id:document.id}
                setProduct(data)
                setCurrentUrl(data.productImages[0])
            }else{
                console.log("unable to get the product with no error not available")
            }
        }catch(e){
            console.log("error in getting the product ",e)
        }


    }
  return (
    <>
    {product?<div className='productDiv'>
     
       <div className='productDivImages'>
            <div className='productImages'>
          {product.productImages.map((data,key)=><div className='customProductImage' onMouseOver={()=>setCurrentUrl(data)}><img  src={data}></img></div>)}
            </div>
            <div className='productImage'>
                <img src={currentUrl}></img>
            </div>
       </div>
        <div className='productImageDetails'>
            <p className='name'>{product.name}</p>
            <p className='price'>Rs {product.price}*</p>
            <p className='desc'>{product.productDescription}</p>
            <div className='orderButton' onClick={orderClickHandler}>
                <p>ORDER</p>
            </div>
            <p>Fabric Requirement</p>
            <p className='descone'>Note: Final fabric will be conveyed by the designer.</p>
            <p>Measurements</p>
            <p className='descone'>Measurements will be taken during the fashion designer consultation.</p>
        </div>
    </div>:<></>}
    </>
  )
}

export default Product