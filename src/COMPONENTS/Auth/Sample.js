import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { db } from './firebase';

const Sample = () => {

  const handler=async ()=>{
    console.log('handler   ')
    
    const colRef=collection(db, "test")
    try {
      const docRef=await addDoc(colRef,{name:'charan'})
    
      console.log("Document written with ID: ",docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   
  }
  const check=async ()=>{

   try{
    const colref=collection(db,'test')
    const docref=doc(colref,'1234')

    const updateDocu=await updateDoc(docref,{
      // 'orders.123.status':'complted'
      // "orders":
    })
    console.log("updated sucesfully")
   }catch(e){
    console.log("error : ",e)
   }
   
    



  }

  return (
    <div>Sample FIRESTORE

      <button onClick={handler}>STORE</button>

      <button onClick={check}>check</button>
      
       </div>
  )
}

export default Sample


// const docRef = doc(db, 'users', '123');
//     const docSnap=await getDoc(docRef)
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }


// Update the timestamp field with the value from the server
  // const updateTimestamp = await updateDoc(docRef, {
  //     timestamp: serverTimestamp()
  // });
  // console.log("done added updates ")
  // console.log('updatetimestamp ',updateTimestamp)


     // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data().first}`);
      // });

    //   const q = query(collection(db, "users"), where("first", "==", "Alan"));

    // const querySnapshot = await getDocs(q);
    // console.log("querysnapshot is ",typeof querySnapshot)
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
     
    // });


    // const colRef=collection(db, "users")
    // try {
    //    await setDoc(doc(colRef,'123'), {
    //     first: "Alan123",
    //     middle: "Mathison",
    //     last: "Turing",
    //     born: 1912,
    //     orders:[{
    //       id:'123',
    //       status:'complted'
    //     },
    //     {
    //       id:'124',
    //       status:'going'
    //     }
    //   ]
    //   });
    
    //   console.log("Document written with ID: ");
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }