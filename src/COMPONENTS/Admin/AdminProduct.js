import { collection, deleteDoc, doc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Store } from '../../App'
import { db } from '../Auth/firebase'
import './AdminProduct.css'
const AdminProduct = ({data,setRefresh}) => {

    const {messageHandlerFunction}=useContext(Store)


    const deleteHandler=async ()=>{

        
        console.log('data is ',data)
        const colRef=collection(db,'products')
        try{
            await deleteDoc(doc(colRef,data.id))
            console.log('deleted sucessfully')
            setRefresh(P=>!P)
            messageHandlerFunction("Deleted Sucessfully",'green')

        }catch(e){
            console.log("unable to delete this product  erroor : ",e)
            
        }

    }

  return (
    <div className='adminProduct'>
        <div >
            {data.productImages.map((imgData,key)=><img src={imgData} ></img>)}
        </div>
        {/* <img src={data.productImages[0]}></img> */}
        <p className='productName'>{data.name}</p>
        <p className='productPrice'>{`${data.price} Rs`}</p>
        <p className='productDelete' onClick={deleteHandler}>delete</p>

    </div>
  )
}

export default AdminProduct