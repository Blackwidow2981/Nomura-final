import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBE6l389s45l9GGv9jhlaTOJwFCF5sk3SI",
    authDomain: "baifortai.firebaseapp.com",
    projectId: "baifortai",
    storageBucket: "baifortai.appspot.com",
    messagingSenderId: "879087511078",
    appId: "1:879087511078:web:809286f9f26399edcc68e7"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase