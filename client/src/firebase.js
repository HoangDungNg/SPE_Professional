//3. Import firebase
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe9lgISUrnusYB0W1Z6MwKwAlHH2RoG4o",
  authDomain: "speportal-60e3d.firebaseapp.com",
  projectId: "speportal-60e3d",
  storageBucket: "speportal-60e3d.appspot.com",
  messagingSenderId: "399861999748",
  appId: "1:399861999748:web:c77847300a7308fd54fad1"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig); //Connects to firebase database and set everything up
const db = firebaseApp.firestore(); //Get the firestore (database)
const auth = firebase.auth(); //Get the authentication

export {db, auth}
