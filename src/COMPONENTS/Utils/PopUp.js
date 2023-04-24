import { addDoc, arrayUnion, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../App';
import Cancel from '../../RESOURCES/IMAGES/Cancel';
import { db } from '../Auth/firebase';
import './PopUp.css'

const PopUp = ({message,redirect,isConfirm}) => {
    const navigate=useNavigate();
    const [data,setData]=useState('')
    const {popUpHandlerFunction,messageHandlerFunction,uid,user}=useContext(Store)
    // const {categoryname}=useParams()
    const location=useLocation()

   
    
    const clickHandler=()=>{
        popUpHandlerFunction('','/',false)
        navigate(redirect)

    }
    const orderHandler=async ()=>{
       
        // console.log('location is 7777   ---',location.pathname)
        const productId=location.pathname.replace('/product/','')
        console.log("id is %%%%   ",productId)
        console.log("in orders is going to happen  ",data)
        const colRef=collection(db,'orders')
        try{
            const documnet=await addDoc(colRef,{
                userId:uid,
                productId:productId,
                status:'ordered',
                phNumber:user.phNumber,
                date:Timestamp.now(),
                message:data

            })
            console.log('order was sucessfull added to orders document id is ',document.id)

            try{
                const userColRef=collection(db,'users');
                const userDocRef=doc(userColRef,uid)
                await updateDoc(userDocRef,{
                    orders:arrayUnion(documnet.id)

                })
                messageHandlerFunction('sucessfully ordered ','green')
                console.log('sucesfully added to users ')
                popUpHandlerFunction('','/',false)
                navigate('/orders')

            }catch(ex){
                console.log("unable to place order users ",ex)
                messageHandlerFunction('unable to place order  ','red')
    
                
            }



        }catch(e){
            console.log("unable to place order to oredres ::  ",e)
            messageHandlerFunction('unable to place order ','red')

        }
  
    }
    
  return (
    <div className='popUpDiv'>
        <div className='popUp'>
            <div className='popCancel'  onClick={()=>popUpHandlerFunction('','/',false)}><Cancel></Cancel></div>
            <p style={{textAlign:'left'}}>{message} </p>
            <textArea value={data} style={{width:"100%",marginLeft:"auto",marginRight:"auto",padding:"10px"}} onChange={(e)=>setData(e.target.value)}></textArea>

            <div className='popButton' onClick={isConfirm?orderHandler:clickHandler}>
                <p>{isConfirm?'Confirm':'Continue'}</p>
            </div>
        </div>
        {/* <Cancel></Cancel> */}
    </div>
  )
}

export default PopUp