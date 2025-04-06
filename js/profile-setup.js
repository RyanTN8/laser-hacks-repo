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

//When submit sign up button is clicked, store information
const signUp = document.getElementById( 'submit' );
signUp.addEventListener( 'click', (event) =>
{

    event.preventDefault();
    const email = document.getElementById( 'ivc-email').value;
    const password = document.getElementById( 'ivc-password' ).value;
    const fullName = document.getElementById( 'name' ).value;
    const year = document.getElementById( 'year' ).value;
    const major = document.getElementById( 'major' ).value;
    const typeOfStudent = document.getElementById( 'student-type' ).value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword( auth, email, password )
    .then( (userCredentials) =>
    {
        const user = userCredentials.user;
        const userData = 
        {
            email: email,
            fullName: fullName,
            year: year,
            major: major,
            typeOfStudent: typeOfStudent
        };

        const docRef = doc( db, "users", user.uid );
        setDoc( docRef, userData )
        .then( () =>
        {
            window.location.href = 'login.html';
        })
        .catch( (error) =>
        {
            console.error( "Error writing document", error );
        })
    })
    .catch( (error) =>
    {
        if( errorCode == 'auth/email-already-in-use' )
        {
            alert( 'Email Already in Use.' )
        }
        else
        {
            alert( 'Unable to Create User.')
        }
    })
})