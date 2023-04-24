import { collection, getDoc, getDocs, query, where,doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../App'
import { db } from '../Auth/firebase'
import './Orders.css'

const Orders = () => {

    const [orders,setOrders]=useState([])
    const {uid}=useContext(Store)

    const navigate=useNavigate();

    useEffect(()=>{
        window.scrollTo({top:0})
       })

    useEffect(()=>{
        console.log('heyyyy ia m orderes $$$$  ')
    })
    useEffect(()=>{
        console.log('i am also called ')
        setOrders([])
        getOrders()


    },[uid])
    const getOrders=async ()=>{
        console.log('got into get orders $$$$ ')
        try{
            console.log('hey iam tryinhg  $$$ and uid is  ',uid)
            const colRef=collection(db,'orders')
        const q=query(colRef, where("userId", "==", uid))
        const querysnapshot=await getDocs(q)
        querysnapshot.forEach(async (docu)=>{
            // const data={...doc.data(),id:doc.id}
            // setOrders(p=>[...p,data])
            console.log("here doc is ",docu.id)
            const dData=docu.data()
            const id=docu.id
            const status=dData.status
            let product={}
            console.log('status is ',status,' and ',dData.productId)
            
            const productColRef=collection(db,'products')
            const productDocRef=doc(productColRef,dData.productId)
            const d=await getDoc(productDocRef)
            if(d.exists()){
                const productId=d.id
                product={...d.data(),productId}
                
                setOrders(p=>[...p,{id:id,status:status,product:product}])
                console.log("sucessfully added documnet in orders  ",id)
                
                
            }else{
                console.log("unable to aadd document in orders ",id)

            }

        })

        }catch(ee){
            console.log("unable to get the orders in start ",ee)
        }
    }
  return (
    <>{orders?<div className='orders'>
        {orders.map((data)=><div className='orderData' onClick={()=>navigate(`/product/${data.product.productId}`)}>
            <div className='orderImage'>
            <img src={data.product.productImages[0]}></img>
            </div>
            <div className='orderDetails'>
            <p className='name'>{data.product.name}</p>
            <p className='price'>Rs {data.product.price}*</p>
            <p className='status'>{data.status}</p>
            </div>
        </div>)}
    </div>:<></>}</>
    
  )
}

export default Orders