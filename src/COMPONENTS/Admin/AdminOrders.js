import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../App'
import CopyIcon from '../../RESOURCES/IMAGES/CopyIcon'
import EditIcon from '../../RESOURCES/IMAGES/EditIcon'
import { db } from '../Auth/firebase'
import './AdminOrders.css'

const AdminOrders = () => {

    const [orders,setOrders]=useState([])
    const navigate=useNavigate()
    const {setShowOrderPop,setAdminOrderId,updateOrders}=useContext(Store)

    useEffect(()=>{
        console.log('called %%%% &&&&&&&&&&&&&&&')
        setOrders([])
        getOrders()
        
    },[updateOrders])


    const getOrders=async ()=>{
        console.log('got into get orders  in admin $$$$ ')
        try{
            console.log('hey iam tryinhg  $$$ and uid is  ')
            const colRef=collection(db,'orders')
      
        const querysnapshot=await getDocs(colRef)
        querysnapshot.forEach(async (docu)=>{
           
            console.log("here doc is ",docu.id)
            const dData=docu.data()
            const id=docu.id
            const status=dData.status
            const phNumber=dData.phNumber
            
            let datee = dData.date.toDate();
            let mm = datee.getMonth();
            let dd = datee.getDate();
            let yyyy = datee.getFullYear();

            datee = dd + '-' + mm + '-' + yyyy;
            console.log("here i comes $$$$$  $$$$$%%%%%%%%%%  ",datee)
            
            let product={}
            console.log('status is ',status,' and ',dData.productId)
            
            const productColRef=collection(db,'products')
            const productDocRef=doc(productColRef,dData.productId)
            const d=await getDoc(productDocRef)
            if(d.exists()){
                const productId=d.id
                product={...d.data(),productId}
                const dataAdd={id:id,status:status,product:product,phNumber:phNumber,date:datee}
                setOrders(p=>[...p,dataAdd])
                console.log("sucessfully added documnet in orders  ",id)
                console.log('data is ',dataAdd)
                
                
            }else{
                console.log("unable to aadd document in orders ",id)

            }

        })

        }catch(ee){
            console.log("unable to get the orders in start ",ee)
        }
    }

    const copyHandler=async (phNumber)=>{
        try {
            await navigator.clipboard.writeText(phNumber);
            console.log('Content copied to clipboard');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }

    }
  return (
    // <>{orders?<div>
     
    //     {orders.map(data=>{<p>{data.id}</p>})}
    // </div>:<></>}</>
    <div className='adminOrders'>
             {/* {orders.map(data=>{<p>{data}</p>})} */}
            
             {orders.map((data,key)=><div key={key} className='orderData'  >
             <div className='orderImage' onClick={()=>navigate(`/product/${data.product.productId}`)}>
            <img src={data.product.productImages[0]}></img>
            </div>
            <div className='orderDetails'>
                <p className='name'>{data.product.name}</p>
                <p className='price'>Rs {data.product.price}*</p>
                <p className='date'>{data.date}</p>
                <div className='orderPh'>
                     <p>{data.phNumber}</p>
                     <div onClick={()=>copyHandler(data.phNumber)}><CopyIcon></CopyIcon></div>

                </div>
                
                <div className='orderEdit'>
                    <p className='status'>{data.status}</p>
                    <div onClick={()=>{setAdminOrderId(data.id);
                        setShowOrderPop(true)}}> <EditIcon></EditIcon></div>
                   
                </div>
            </div>
             </div>)}
    </div>
  )
}

export default AdminOrders