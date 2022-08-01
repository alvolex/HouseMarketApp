import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getAuth, updateProfile, onAuthStateChanged} from "firebase/auth";
import {db} from "../firebase.config";
import {doc, updateDoc} from "firebase/firestore";
import {toast} from "react-toastify";

function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    
    const [changeDetails, setChangeDetails] = useState(false);    
    const [currentUser, setCurrentUser] = useState({});
    
    const [formData, setFormData] = useState({
        name: auth.currentUser?.displayName || "",
        email: auth.currentUser?.email  || "",
    });    
    
    const {name, email} = formData;    
    
    useEffect(()=>{
        onAuthStateChanged(auth,(user) => {
            if (user && user !== currentUser) {
                setCurrentUser(user);
                setFormData({name: user.displayName, email: user.email});
            }
            else if (!user) {
                navigate("/sign-in")
            }
        });
        
       /* if (auth.currentUser){
            setCurrentUser(auth.currentUser);
        }else{
            setCurrentUser({});
            navigate("/sign-in")
        }*/
    },[])

    const onLogout = () => {
        auth.signOut();
        navigate("/");
    }
    
    const onSubmit = async (e) => {
        try {
            if (auth.currentUser.displayName === name){
                return;
            }

            await updateProfile(auth.currentUser, {displayName: name});            
            const userRef = doc(db, "users", auth.currentUser.uid);            
            await updateDoc(userRef, {name: name});
            
            setCurrentUser({...currentUser, displayName: name});
            
        } catch (error) {
            toast.error('Something went wrong, please try again.');
        }
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const formatName = () => {
        if (currentUser.displayName){
            let firstName = currentUser.displayName.split(" ")[0];
            if (firstName.length > 10){
                firstName =  firstName.substring(0, 10) + "...";
            }
            
            const lastName = currentUser.displayName.split(" ")[1];
            
            if (lastName){
                return `${firstName} ${lastName[0].toUpperCase()}`;
            }            
            return firstName;
        }else{
            return "";
        }
    }
    
    return (
        <div className={"container mx-auto flex-1 flex flex-col mt-6 items-center"}>
            <div className={"flex sm:flex-row flex-col items-center mb-6 mx-auto"}>
                <div className={"flex text-center"}>
                    <h1 className={"text-6xl font-bold bg-clip-text text-transparent text-center bg-gradient-to-r from-primary to-error via-secondary mx-auto pb-4 pt-2 mb-6 sm:mb-0 overflow-hidden"}>
                        Welcome, <span className={"whitespace-nowrap"}>{formatName()}</span>
                    </h1>
                </div>
                <button type={"button"} onClick={onLogout} className={"btn btn-primary mx-auto sm:w-fit w-full max-w-[50%] sm:ml-10"}>Sign out
                </button>
            </div>

            <main className={""}>
                <div className="grid grid-cols-2 flex bg-base-300 py-6 rounded-xl">
                    <p className={"font-semibold justify-self-end mr-8"}>Profile Details</p>
                    <div className={"ml-8"}>
                        <p className={"text-success  btn btn-sm btn-outline mb-6 "} onClick={() => {
                            changeDetails && onSubmit()
                            setChangeDetails(!changeDetails)
                        }}>{changeDetails ? 'done' : 'change'}</p>
                    </div>

                    <p className={"text-bold justify-self-end mr-8"}>Display Name: </p>
                    <input type={"text"} name={'name'}
                           className={`text-bold ml-8 input input-sm input-primary max-w-[50%] mb-2 ${!changeDetails ? 'text-neutral-content' : ''} `}
                           disabled={!changeDetails} value={name} onChange={onChange}/>
                    <p className={"text-bold justify-self-end mr-8"}>Email: </p>
                    <input type={"text"} name={'email'}
                           className={`text-bold ml-8 input input-sm input-primary max-w-[50%] mb-2 text-neutral-content`} disabled={true}
                           value={email} onChange={onChange}/>
                </div>
            </main>
        </div>
    )    
}

export default Profile;