import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store} from '../../App'
import EditIcon from '../../RESOURCES/IMAGES/EditIcon'
import { auth, db } from './firebase'
import './Login.css'

const Login = () => {
    const [mobilenumber,setMobileNumber]=useState('')
    const [otpSent,setOtpSent]=useState(false)
    const [otp,setOtp]=useState('')

    const {uid,user,setUpdateUser}=useContext(Store)

    const navigate=useNavigate();
    
    useEffect(()=>{
        window.scrollTo({top:0})
       })

    useEffect(()=>{
        console.log("in the useeffect of login js ")
        if(uid && user ){
            navigate('/profile')
        }

    },[])
    const {messageHandlerFunction}=useContext(Store)
    const otpHandler=(e)=>{
        if(isNaN(e.target.value)===true){   

        }
        else{
            setOtp(e.target.value)
        }
    }
    const phNumberHandler=(e)=>{
        if(isNaN(e.target.value)===true){

        }else{
            setMobileNumber(e.target.value)
        }

    }
    const recaptcha=()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('recaptch verified sucessfully ')
               
            }
          }, auth);
      }
 
    const loginHandler=()=>{
        if(mobilenumber.length!==10){
            console.log('please enter the mobile number')
            return
        }
        const phoneNumber ="+91"+mobilenumber;
        console.log('phonenumber is ',phoneNumber);

        // return
        console.log('window ecptcha verifier is before  ',window.recaptchaVerifier)
        if(window.recaptchaVerifier){
    
        }else{
            recaptcha()
    
        }
        
        console.log('after ',window.recaptchaVerifier)
    const appVerifier = window.recaptchaVerifier;
    
    
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("confirmationresult ",confirmationResult)
          messageHandlerFunction("otp sent sucessfully",'green')
          setOtpSent(true)
    
        }).catch((error) => {
    
          console.log('otp not sent ',error )
     
        });

    }
    const userLoginHandler=()=>{
        console.log('otp is ',otp)
        const confirmationResult=window.confirmationResult
        confirmationResult.confirm(otp).then(async (result) => {
            // User signed in successfully.
            messageHandlerFunction("sucessfully authenticated. welcome ",'#84f0b8')
            const user = result.user;
            console.log('user is in  confirmation  ',user)
            await checkUser(user.uid)
            navigate('/')
          }).catch((error) => {

          });
    }



    const createNewUser=async (id,phNumber)=>{
        console.log("came into create new user ")
        const colRef=collection(db,'users')
        try {
            await setDoc(doc(colRef,id),{
                phNumber:phNumber,
                id:id,
                name:'',
                email:'',
                emailVerified:false,
                isSignIn:true,
                orders:[],
                alternateNumber:'',
                address:'',
                isAdmin:false
            })
            console.log("sucessfully created ")
            setUpdateUser(p=>!p)
            navigate('/')
            return
        }catch(e){
            console.log("error in user creation  : error : ",e);
            console.log("unable to create new user ")
            return
        }

    }
    const checkUser=async (uid)=>{
        console.log("uid is ",uid)
        console.log("came into check user by update ref ")
        const colRef=collection(db,'users')
        const docRef=doc(colRef,uid)
        try{
                const updated=await updateDoc(docRef,{})
                console.log("user already present with id ",updated)
                // return true
        }catch(e){
            console.log("unable to update  errro : ",e)
            createNewUser(uid,mobilenumber)
            // return false
        }

    }
  return (
    <div className='login'>
        
        <div className='loginPage'>
            {otpSent===false?<> <p>Login | Signup</p>
            <input className='loginInput' value={mobilenumber} maxLength={10} placeholder='Phone Number' onChange={(e)=>phNumberHandler(e)}></input>
            <div className='loginButton' onClick={mobilenumber.length===10?loginHandler:()=>{}}>
                <p>Continue</p>
            </div></>
           :    <><p>Verify with OTP </p>
           <div className='editDivAuth'><h3 className='otpPara'>sent to {mobilenumber} 
           </h3> <div style={{cursor:"pointer"}} 
           onClick={()=>{setOtp('');setOtpSent(false);setMobileNumber('')}}><EditIcon></EditIcon> </div>
           </div>
           <input className='otpInput' maxLength={6} value={otp} onChange={(e)=>otpHandler(e)} ></input>
           <div style={{backgroundColor:"var(--primary-color-desktop--)"}} className='loginButton' onClick={otp.length===6?userLoginHandler:()=>{}}>
                <p>Verify OTP</p>
            </div>
            <p style={{textAlign:"center",fontSize:"14px",color:"var(--primary-color-desktop--)",cursor:'pointer',marginTop:"10px"}} onClick={loginHandler}>Resend OTP</p>
       </>  }
       <div id='recaptcha-container'></div>
        </div>
    </div>
  )
}

export default Login