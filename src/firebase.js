import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithEmailAndPassword ,
    createUserWithEmailAndPassword,
signOut } from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore} from "firebase/firestore";

import {toast} from 'react-toastify'




const firebaseConfig = {
  apiKey: "AIzaSyDHZ159Ptym38-XJcLMcmZ1Blml7y4OklE",
  authDomain: "netflix-clone-86ee4.firebaseapp.com",
  projectId: "netflix-clone-86ee4",
  storageBucket: "netflix-clone-86ee4.firebasestorage.app",
  messagingSenderId: "190526680461",
  appId: "1:190526680461:web:101e18e6d45ffcf433e1c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email,password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth,email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }   

}


const login = async(email,password) =>{
    try {
      await  signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout =() =>{
    signOut(auth);
}

export{auth, db, login, signup, logout};