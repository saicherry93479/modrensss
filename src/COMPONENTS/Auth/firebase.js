// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEVBlPNYHeMs2OrEN2wlb2QDTZt1LqRjk",
  authDomain: "tailor-e71df.firebaseapp.com",
  projectId: "tailor-e71df",
  storageBucket: "tailor-e71df.appspot.com",
  messagingSenderId: "942100954038",
  appId: "1:942100954038:web:ea1403fdde310439ffdf17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app);
// export default {auth,storage};
// export default storage;