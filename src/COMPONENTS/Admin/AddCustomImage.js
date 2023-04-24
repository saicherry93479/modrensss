import React, { useEffect, useState } from 'react'

const AddCustomImage = ({file,setFile}) => {
    const [preview,setPreview]=useState(null)

    useEffect(()=>{
        if(!file){
            console.log('file not their  ',file)
            setPreview(null)
        }else {
            console.log('file present  ',file)
            setPreview(URL.createObjectURL(file))
        }
    },[file])


    const urlGenrate=(e)=>{
        setFile(e.target.files[0])

       

    }
  return (
    <div className='addCustomImage'>
        
    {preview ===null && file===null?<><div className='label'>
    <label for='addImage' >+</label>

    </div>
    
    <input id='addImage'  onChange={(e)=>urlGenrate(e)} type='file' accept='image/*' ></input></>
    : <div className='imageOverlay'>
        <img src={file?preview:''}></img>
        <div className='customImageOverlay'>
            <div className='newProductDelete' onClick={(e)=>{setFile(null);setPreview(null)}}>
                <p>Delete</p>
            </div>
        </div>
      </div>
      }
</div>
  )
}

export default AddCustomImage