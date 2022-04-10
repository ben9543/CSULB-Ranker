// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgp1Jag7qOvMjTScXEK57DR704CFsT1DA",
  authDomain: "beachhack-c05e1.firebaseapp.com",
  projectId: "beachhack-c05e1",
  storageBucket: "beachhack-c05e1.appspot.com",
  messagingSenderId: "54913921247",
  appId: "1:54913921247:web:3a7cb1ec425a332b47396a",
  measurementId: "G-RBRNQ93R29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const saveDocument = async(collectionName, obj) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), obj);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const readDocument = async(collectionName) => {
  try{
    return await getDocs(collection(db, collectionName));
  }catch(e){
    return e;
  }
}

export const updateDocument = async(collectionName, id, obj) => {
  try{
    const ref = doc(db, collectionName, id);
    await updateDoc(ref, obj);
  }catch(e){
    return e;
  }
}