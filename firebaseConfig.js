import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDbj-ns0vJqFZ0sTmMvMUSWqMBnfZGb9uU",
    authDomain: "quizbee-890d3.firebaseapp.com",
    projectId: "quizbee-890d3",
    storageBucket: "quizbee-890d3.appspot.com",
    messagingSenderId: "673353001437",
    appId: "1:673353001437:web:31da7448429c8edbb6ae34"
};

const app = initializeApp(firebaseConfig);
export default app;