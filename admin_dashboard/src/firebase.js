// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7CU3LR7NZvSwG9cCJISh5fLb0aQl12gw",
  authDomain: "laatulakki.firebaseapp.com",
  projectId: "laatulakki",
  storageBucket: "laatulakki.appspot.com",
  messagingSenderId: "1059122932110",
  appId: "1:1059122932110:web:45bbe402600d52ec791cdf",
  measurementId: "G-0R41FYJSXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;