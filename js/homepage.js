// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }  from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFxSmDkBUfBIQfi8lCvsSzwHNlYsPyzaA",
    authDomain: "lasertag-72349.firebaseapp.com",
    projectId: "lasertag-72349",
    storageBucket: "lasertag-72349.firebasestorage.app",
    messagingSenderId: "590542201250",
    appId: "1:590542201250:web:d0ddd9d51ed0d5879dd2fb",
    measurementId: "G-TEJ0KRJ0BP"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize auth and database
  const auth = getAuth();
  const db = getFirestore();

  // When logged in
  onAuthStateChanged( auth, (user) =>
{
    //Gets the logged in user's id
    const loggedInUserID = localStorage.getItem( 'loggedInUserID' );
    if( loggedInUserID )
    {
        const docRef = doc( db, "users", loggedInUserID );
        getDoc( docRef )
        .then( (docSnap) =>
        {
            if( docSnap.exists() )
            {
                const userData = docSnap.data();
                document.getElementById( 'loggedUserFullName' ).innerText = userData.fullName;
                document.getElementById( 'loggedUserEmail' ).innerText = userData.email;
                document.getElementById( 'loggedUserMajor' ).innerText = userData.major;
                document.getElementById( 'loggedUserTypeOfStudent' ).innerText = userData.typeOfStudent;
                document.getElementById( 'loggedUserYear' ).innerText = userData.year;
            }
            else
            {
                console.log( "no document found matching id" )
            }
        })
        .catch( (error) =>
        {
            console.log( "Error getting document" );
        })
    }
    else
    {
        console.log( "User Id not found in local storage" )
    }
})

const logoutButton = document.getElementById( 'logout' );

logoutButton.addEventListener( 'click', () =>
{
    localStorage.removeItem( 'loggedInUserID' );
    signOut( auth )
    .then( () =>
    {
        window.location.href = 'login.html';
    })
    .catch( (error) =>
    {
        console.error( 'Error Signing out:', error )
    })
})