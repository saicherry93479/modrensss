import { async } from '@firebase/util'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { Await } from 'react-router-dom'
import { Store } from '../../App'
import Cancel from '../../RESOURCES/IMAGES/Cancel'
import { db } from '../Auth/firebase'
import './OrderPop.css'

const OrderPop = () => {
    const [status,setStatus]=useState('')
    const [showDelete,setShowDelete]=useState(false)
    const {setShowOrderPop,adminOrderId,messageHandlerFunction,setUpdateOrders}=useContext(Store)


    const confirmHandler=async ()=>{
        console.log('id is ',adminOrderId)
        if(status.length<6){
            messageHandlerFunction('please enter atlease 6 chars ','red')
            return
        }
        const colRef=collection(db,"orders")
        const docRef=doc(colRef,adminOrderId)
        try{
            await updateDoc(docRef,{
                status:status
            })
            setShowOrderPop(false)
            setUpdateOrders(p=>!p)

        }catch(e){
            console.log('unable to update statsus')
            messageHandlerFunction('unable to update ')
            setShowOrderPop(false)
        }

    }
    const deleteHandler=()=>{
        setShowDelete(true)

    }
    const deleteConfirmHandler=async ()=>{
        try{
            const colRef=collection(db,'orders')
            const docRef=doc(colRef,adminOrderId)
            await deleteDoc(docRef)
            messageHandlerFunction('deleted sucessfully ','green')
            setShowOrderPop(false)
            setUpdateOrders(p=>!p)
        }catch(e){
            console.log('unable to delete order',e)
            messageHandlerFunction('unable to delete ','crimson')
            setShowOrderPop(false)
        }
    }
  return (
    <div className='popUpDiv'>
        <div className='popUp'>
        <div className='popCancel'  onClick={()=>setShowOrderPop(false)}><Cancel></Cancel></div>
          {showDelete?<div>
            <p>Click Button to Delete</p>
            <div className='popButton' onClick={deleteConfirmHandler}>
                <p>Confirm Delete</p>
            </div>
          </div>: <> 
            <p style={{textAlign:"left",marginBottom:"10px"}}>Status</p>
            <input className='statusInput' type={'text'} value={status}onChange={(e)=>setStatus(e.target.value)}></input>
            <div className='popButton'  onClick={confirmHandler}>
                    <p>Confirm</p>
            </div>
                <div className='popButton' style={{backgroundColor:"crimson"}}  onClick={deleteHandler}>
                    <p>Delete Order</p>
                </div></>}

        </div>
    </div>
  )
}

export default OrderPop