import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByYk_vX4qRROXNeSnANH-nwHmyQjoeDcY",
    authDomain: "fir-house-market.firebaseapp.com",
    projectId: "fir-house-market",
    storageBucket: "fir-house-market.appspot.com",
    messagingSenderId: "190686078631",
    appId: "1:190686078631:web:58cd63ca0c28b15cd1dd82"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();