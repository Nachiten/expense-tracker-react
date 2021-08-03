import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
   apiKey: "AIzaSyDJn4f8l-KFZRYOmTGtAgYcoQK9KP2ClXQ",
   authDomain: "expense-tracker-react-39b76.firebaseapp.com",
   projectId: "expense-tracker-react-39b76",
   storageBucket: "expense-tracker-react-39b76.appspot.com",
   messagingSenderId: "983305000128",
   appId: "1:983305000128:web:bb4b868ce7b7965be54925",
   measurementId: "G-YKZMSW70K0"
 };

 var fire = firebase.initializeApp(firebaseConfig);

 export default fire;