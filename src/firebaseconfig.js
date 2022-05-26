// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIK0JRNm1La7kvnLZMhpISWUK223uSwOE",
  authDomain: "ranger-connect.firebaseapp.com",
  projectId: "ranger-connect",
  storageBucket: "ranger-connect.appspot.com",
  messagingSenderId: "75554540040",
  appId: "1:75554540040:web:23cf4d27e534992225dfbd",
  measurementId: "G-YFBBQBGGKN",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
