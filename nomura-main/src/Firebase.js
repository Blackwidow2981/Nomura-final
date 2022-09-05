import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE6l389s45l9GGv9jhlaTOJwFCF5sk3SI",
  authDomain: "baifortai.firebaseapp.com",
  projectId: "baifortai",
  storageBucket: "baifortai.appspot.com",
  messagingSenderId: "879087511078",
  appId: "1:879087511078:web:809286f9f26399edcc68e7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
