// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }  from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//API_KEY
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;
console.log(apiKey);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "lasertag-72349.firebaseapp.com",
  projectId: "lasertag-72349",
  storageBucket: "lasertag-72349.firebasestorage.app",
  messagingSenderId: "590542201250",
  appId: "1:590542201250:web:d0ddd9d51ed0d5879dd2fb",
  measurementId: "G-TEJ0KRJ0BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signIn = document.getElementById( 'login-button' )
signIn.addEventListener( 'click', (event) =>
{
    event.preventDefault();
    const email = document.getElementById( 'email' ).value;
    const password = document.getElementById( 'password' ).value;
    const auth = getAuth();

    signInWithEmailAndPassword( auth, email, password )
    .then( (userCredentials) =>
    {
        const user = userCredentials.user;
        localStorage.setItem( 'loggedInUserID', user.uid )
        window.location.href = 'homepage.html'; //<-- add new html file for main page
    })
    .catch( (error) =>
    {
        const errorCode = error.code;
        if( errorCode === 'auth/invalid-credentials' )
        {
            alert( 'Incorrect Email or Password' )
        } 
        else
        {
            alert( 'Account does not Exist' )
        }
    })
})

