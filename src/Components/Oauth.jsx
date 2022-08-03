import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {doc, setDoc, getDoc, serverTimestamp} from "firebase/firestore";
import {toast} from "react-toastify";
import {db} from "../firebase.config";

const Oauth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const {user} = result;
            
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            
            //Save user in database if they do not exists
            if (!userDoc.exists) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            
            navigate("/");
        } catch (error) {
            toast.error('Something went wrong, please try again.');
        }
    }

    return (
        <div>
            <p className={"text-center font-semibold mb-3"}>Sign {location.pathname === "/sign-up" ? 'up' : 'in'} </p>
            <FcGoogle onClick={onGoogleClick}
                      className="text-6xl text-primary border border-solid rounded-lg border-primary hover:bg-primary  hover:cursor-pointer hover:shadow-md hover:shadow-primary shadow shadow-primary"/>
        </div>
    )
};

export default Oauth;