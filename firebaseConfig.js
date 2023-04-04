import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDbj-ns0vJqFZ0sTmMvMUSWqMBnfZGb9uU",
    authDomain: "quizbee-890d3.firebaseapp.com",
    projectId: "quizbee-890d3",
    storageBucket: "quizbee-890d3.appspot.com",
    messagingSenderId: "673353001437",
    appId: "1:673353001437:web:31da7448429c8edbb6ae34"
};

const firebaseConfig2 = {
    apiKey: "AIzaSyDa7D1AqnUnSagvicnwuP6KjfQhpZ9p6rw",
    authDomain: "temp-8ad73.firebaseapp.com", 
    projectId: "temp-8ad73",
    storageBucket: "temp-8ad73.appspot.com",
    messagingSenderId: "312926287556",
    appId: "1:312926287556:web:78c4011471e5ee7786fb91"
  };
  

const app = initializeApp(firebaseConfig);
export default app;