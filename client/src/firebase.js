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
  // apiKey: "AIzaSyBGZ5d65Z6j1dDPIbc18nduyaR1Urj57KM",
  // authDomain: "speprofessionalportal.firebaseapp.com",
  // projectId: "speprofessionalportal",
  // storageBucket: "speprofessionalportal.appspot.com",
  // messagingSenderId: "687501623949",
  // appId: "1:687501623949:web:40f32db1d02125268e58c4"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig); //Connects to firebase database and set everything up
const db = firebaseApp.firestore(); //Get the firestore (database)
const auth = firebase.auth(); //Get the authentication

export {db, auth}
