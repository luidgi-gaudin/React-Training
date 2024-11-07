// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRC6svKwkstuuHnZ0X4t9QXW7YBUlKZkE",
    authDomain: "react-route-depense.firebaseapp.com",
    projectId: "react-route-depense",
    storageBucket: "react-route-depense.firebasestorage.app",
    messagingSenderId: "759784925088",
    appId: "1:759784925088:web:bc7198e15e8fc740ec26c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const bdd = getFirestore(app);

export { auth, app, bdd };
