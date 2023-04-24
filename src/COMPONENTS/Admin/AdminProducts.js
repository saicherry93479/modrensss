import { collection, doc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../App'
import { db } from '../Auth/firebase'
import AdminProduct from './AdminProduct'
import './AdminProducts.css'


const AdminProducts = () => {
    const [search,setSearch]=useState('')
    const [refresh,setRefresh]=useState(false)

    const [products,setProducts]=useState([])

    const {messageHandlerFunction}=useContext(Store)

    useEffect(()=>{
        setProducts([])
        getProducts()
        console.log('executed once ')

    },[refresh])

    const getProducts=async ()=>{
        const docu=collection(db,'products')
        try{
            const snapshot=await getDocs(docu)
            snapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let data={...doc.data(),id:doc.id}
                setProducts(p=>[...p,data])
              });
             
              
        }catch(e){
            console.log('unable to get products error ',e)
            messageHandlerFunction('unable to get products','crimson')
            
        }
    }
   

    const navigate=useNavigate();
    

    const keyPressEvent=(e)=>{
        if (e.key === "Enter") {
            console.log("enter key ")
            if(search.length>0){

            }
            else{
                

            }

            e.preventDefault();

          
          }

    }
  return (
    <div className='products'>


        <div className='productsTop'>
            <div>
                <input onKeyDown={(e)=>keyPressEvent(e)}></input>
            </div>
           <div>
            <div class="select">
                <select id="standard-select">
                    <option value="Option 1">NONE</option>
                    <option value="Option 2">BLOUSE</option>
                    <option value="Option 3">KURTI</option>
                    <option value="Option 4">Option 4</option>
                    <option value="Option 5">Option 5</option>
                 </select>
                <span class="focus"></span>
             
            </div>
            <div className='newProductButton' onClick={()=>navigate('/admin/newProduct')}>
                    <p>New</p>
            </div>
            </div> 
            
        </div>

        <div className='adminProductsImages'>
            {products.map((data,key)=><AdminProduct data={data} key={key} setRefresh={setRefresh}></AdminProduct>)}
        </div>
    </div>
  )
}

export default AdminProducts