import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../App'
import LeftIcon from '../../RESOURCES/IMAGES/LeftIcon'

import AddCustomImage from './AddCustomImage'
import { db, storage } from '../Auth/firebase'
import './NewProduct.css'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const NewProduct = () => {
    const [fileOne,setFileOne]=useState(null)
    const [fileTwo,setFileTwo]=useState(null)
    const [fileThree,setFileThree]=useState(null)
    const [fileFour,setFileFour]=useState(null)
    const [productName,setProductName]=useState('')
    const [productPrice,setProductPrice]=useState('')
    const [productDescription,setProductDescription]=useState("")
    const [type,setType]=useState('')
    const [fileCount,setFileCount]=useState(0)
    const [fileUrls,setFileUrls]=useState([])


    const navigate=useNavigate();
    
  


    const {messageHandlerFunction}=useContext(Store)


    useEffect(()=>{
        if(fileUrls.length===fileCount && fileCount>0){
            console.log('all are uploaded ')
            createproduct()


        }
    },[fileUrls])

  


    
    const uploadHandler=()=>{
        let filesUpload=[]
        console.log("uploadhandler ",productPrice)
        if(productName.length<6 || productPrice.length<2 || productDescription.length<20 ){
                console.log('please enter all values correctly ')
                messageHandlerFunction("Enter all values with min length ",'crimson')
                return
        }
       if(isNaN(productPrice)===true){
        console.log("not a number ")
        messageHandlerFunction('Please enter price in numerics','crimson')
        return
       }

       let fc=0
       if(fileOne!==null){
        fc+=1
        filesUpload.push(fileOne)
        
       }
       if(fileTwo!==null){
        fc+=1
        // setFiels(p=>[...p,fileTwo])
        filesUpload.push(fileTwo)
        

       }
       if(fileThree!==null){
        fc+=1
        // setFiels(p=>[...p,fileThree])
        filesUpload.push(fileThree)
       }
       if(fileFour!=null){
        fc+=1
        // setFiels(p=>[...p,fileFour])
        filesUpload.push(fileFour)
       }
       setFileCount(fc)
       if(fc<=0){
        messageHandlerFunction("Please Upload at least 1 image",'crimson')
        
        return 
       }
       console.log("file count is ",fileCount)
       console.log('type is ',type)
       if(type==='Option 1' || ''){
        messageHandlerFunction("Please select Type of Product ",'crimson')
        return
       }
       console.log('productname ',productName,' price is ',productPrice,' description is ',productDescription)
       console.log('producttype is ',type)
       console.log('number of files ',fileCount)
       for(let i=0;i<filesUpload.length;i++){
        uploadFile(filesUpload[i])
       }
       

    }

    const createproduct=async ()=>{
        console.log("came into create new product ")
        const id=''
        const colRef=collection(db,'products')
        try {
            await addDoc(colRef,{
                
           
                name:productName,
                price:productPrice,
                productDescription:productDescription,
                productImages:fileUrls,
                type:type

         
            })
            messageHandlerFunction("sucessully product added",'green')
            setFileUrls([])
            setProductDescription('')
            setProductName('')
            setType('Option 1')
            setProductPrice('')
            setFileCount(0)
            setFileOne(null)
            setFileThree(null)
            setFileTwo(null)
            setFileFour(null)
            console.log("sucessfully created ")
        }catch(e){
            console.log("error in product creation  : error : ",e);
            console.log("unable to create new user ")
            messageHandlerFunction("unable to upload ",'crimson')
        }


    }

    const uploadFile=(file)=>{
            console.log('in file upload name ',file.name)
            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    // console.log('Upload is paused');
                    break;
                case 'running':
                    // console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {

                switch (error.code) {
                case 'storage/unauthorized':
                    messageHandlerFunction('unauthorized to upload ','crimson')
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    messageHandlerFunction("canceled to upload ",'crimson')
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    messageHandlerFunction("error in uploading ",'crimson')
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setFileUrls(p=>[...p,downloadURL])
              
                            });
            }
            );
    }
    
  return (
    <div className='newProduct'>
        <div className='backButton' onClick={()=>navigate('/admin/products')}>
            <LeftIcon></LeftIcon>
        </div>
        <div className='customDetails'>
            <div className='customInputs'>
                    <div className='customInput'>
                        <p>Name of The Product</p>
                        <input type={'text'} onChange={(e)=>setProductName(e.target.value)} value={productName}></input>

                    </div>
                    <div className='customInput'>
                        <p>price of the Product</p>
                        <input onChange={(e)=>setProductPrice(e.target.value)} value={productPrice}></input>

                    </div>
                    <div class="selectProduct">
                    <p>Type of Product</p>
                        <select id="standard-select" onChange={(e)=>setType(e.target.value)} value={type}>
                            <option value="Option 1">NONE</option>
                            <option value="BLOUSE">BLOUSE</option>
                            <option value="KURTI">KURTI</option>
                            <option value="SALWAR KAMAZ">Salwar Kamaz</option>
                            <option value="SHIRT">Shirt</option>
                            <option value="SAREE">Saree</option>
                            <option value="PANT">Pant</option>
                            <option value="SKIRT">Skirt</option>
                            <option value="LEHENGA">Lehenga</option>
                            <option value="JUMPSUIT">Jumpsuit</option>
                            <option value="Dress">Dress</option>
                            <option value="Top">Top</option>
                            <option value="JACKET">Jacket</option>
                            
                        </select>
                        <span class="focus"></span>
             
                    </div>
            </div>
            <div className='textArea'>
                    <p>Description of The Product</p>
                    <textarea  value={productDescription} onChange={(e)=>setProductDescription(e.target.value)}></textarea>
            </div>
        
        </div>

        <div className='addImages'>
            <p>Add Images</p>
            <div className='addCustomeImages'>
                <AddCustomImage file={fileOne} setFile={setFileOne}></AddCustomImage>
                <AddCustomImage file={fileTwo} setFile={setFileTwo}></AddCustomImage>
                <AddCustomImage file={fileThree} setFile={setFileThree}></AddCustomImage>
                <AddCustomImage file={fileFour} setFile={setFileFour}></AddCustomImage>

            </div>
            



        </div>

        <div className='newProductUpload' onClick={uploadHandler}>
            <p>Upload</p>
        </div>

   
    
    </div>
  )
}

export default NewProduct