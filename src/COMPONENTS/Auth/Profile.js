import { signOut } from 'firebase/auth';
import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../App';
import CustomBoxProfile from './CustomBoxProfile';
import { auth, db } from './firebase';
import './Profile.css'

const Profile = () => {
    const {user,uid,messageHandlerFunction,setUpdateUser,updateUser}=useContext(Store);
    const [phNumber,setPhNumber]=useState('')
    const [name,setName]=useState('')
    const [alternateNumber,setAlternateNumber]=useState('')
    const [email,setEmail]=useState('')
    const [address,setAddress]=useState("");
    const navigate=useNavigate();



    const signoutHandler=async ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            messageHandlerFunction("Logged out Sucessfully",'green')
            navigate("/")
            window.location.reload(false)
          }).catch((error) => {
            // An error happened.
            messageHandlerFunction('unable to logout ','red')
          });
    }

    useEffect(()=>{
        if(user && uid){
            setPhNumber(user.phNumber)
             
          
        }
    })
    useEffect(()=>{
        if(!uid){
            console.log("uid in profile is ",uid)
            // navigate('/')

        }
        console.log('uid is  in profile ',uid,' user is ',user)
        
        setName(user.name)
        setEmail(user.email)
        setAddress(user.address)
        setAlternateNumber(user.alternateNumber)
        console.log("####  user updated is %%% ###   ",user)


    },[updateUser,uid,user])
    
    const updateHandler=async ()=>{
        const colRef=collection(db, "users")
        const docRef=doc(colRef,uid)
        try{
            await updateDoc(docRef,{
                name:name,
                alternateNumber:alternateNumber,
                email:email,
                address:address
            })
            setUpdateUser(p=>!p)
            messageHandlerFunction("sucessfully updated ",'green')
            setName('')
            setPhNumber('')
            setEmail('')
            setAddress('')
            setAlternateNumber('')
            
        }catch(e){
            messageHandlerFunction("error in updating",'crimson')
        }
   


    }
  return (
    <div className='profile'>
            {user.isAdmin===true?<p className='adminDashBoard' onClick={()=>navigate('/admin')}>Open Admin Dashboard</p>:<></>}
            <div className='profileDetails'>
                
                <CustomBoxProfile text={'Phone Number'} setState={setPhNumber} value={phNumber} change={true}></CustomBoxProfile>
                <CustomBoxProfile text={'Alternate Number'} setState={setAlternateNumber} value={alternateNumber} ></CustomBoxProfile>
                <CustomBoxProfile text={'Name'} setState={setName}  value={name}></CustomBoxProfile>
                <CustomBoxProfile text={'Email'} setState={setEmail} value={email} ></CustomBoxProfile>
                <div>
                    <p>Address</p>
                <textarea onChange={(e)=>setAddress(e.target.value)} value={address}></textarea>
                </div>
            </div>
           <div className='profileButtons'>
                <div className='profileUpdateButton' onClick={updateHandler}>
                    <p>Update Details</p>
                </div>
                <div className='profileSignoutButton' onClick={signoutHandler}>
                    <p>Signout</p>
                </div>
           </div>
    
        {/* <CustomBoxProfile text={'Address'} changeHandler={(e)=>setAddress(e.target.value)} value={user.phNumber}></CustomBoxProfile> */}
    </div>
  )
}

export default Profile