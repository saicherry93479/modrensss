import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../Auth/firebase'
import SectionFour from '../Home/SectionFour'
import SectionTwoItems from '../Home/SectionTwoItems'
import { PRODUCTSDATA, TEXTTOIMAGES } from '../Utils/HomeData'
import './ProductsHome.css'

const ProductsHome = () => {
    const {categoryname}=useParams()
    const [products,setProducts]=useState([])

    const navigate=useNavigate();

   useEffect(()=>{
    window.scrollTo({top:0})
   })

    useEffect(()=>{
      setProducts([])
      getProducts()
    },[categoryname])

    const getProducts= async ()=>{
      const colRef=collection(db,'products')
      try{
              const q = query(colRef, where("type", "==", categoryname));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc)=>{
                // console.log(doc.data().name)
                const data={...doc.data(),id:doc.id}
                setProducts(p=>[...p,data])

              })
      }catch(e){
        console.log("error in getting products type data ",e)

      }
      
    }
  return (
    <div className='productsHome'>
        <div className='categoryTopCard'>
          <div className='firstDiv'>
            <h1>{categoryname}</h1>
            <h2>Get the perfect {categoryname} tailor-made to your style</h2>
            <p>10k+ Kurtas Designed</p>
            <p>Different Cutwork Styles</p>
            {/* <p>{PRODUCTSDATA.name}</p> */}
          </div>
          <img src={PRODUCTSDATA[categoryname]}></img>
        </div>
        <div className='productsMain'>
          <p  className='productsMainHeader'>Pick Your Style</p>
          <div>
          {products.map((data)=><div className='productsHomeProduct' onClick={()=>navigate(`/product/${data.id}`,{ state: data })}>
            <div><img src={data.productImages[0]}></img></div>
            <p className='name'>{data.name}</p>
            <p className='price'>Rs {data.price}*</p>
          </div>)}
          </div>
        </div>
    <SectionFour></SectionFour>
    <div className='other'>
        <h1 className='Header'>Explore Other Categories</h1>
        <SectionTwoItems dName={categoryname}></SectionTwoItems>
    </div>
    </div>
  )
}

export default ProductsHome