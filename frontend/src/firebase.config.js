// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPAeBd1VPsgZ7hN-JcVUQf2pfaiTKmKUQ",
  authDomain: "resume-3697f.firebaseapp.com",
  projectId: "resume-3697f",
  storageBucket: "resume-3697f.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "1064219599310",
  appId: "1:1064219599310:web:64d3653d4ef176dd1d0b9f",
  measurementId: "G-H119YPG4S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);


export { auth, provider, analytics };
