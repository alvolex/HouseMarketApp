import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Profile() {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = getAuth();
    
        if (auth.currentUser){
            console.log("WE ARE LOGGED IN AS " + auth.currentUser.displayName)
            setCurrentUser(auth.currentUser);
        }else{
            navigate("/sign-in")
        }
    },[])
    
    if (currentUser.displayName){
        return (
            <div className={"container mx-auto flex-1 flex align-middle justify-center"}>
                <h1>Welcome, {currentUser.displayName}</h1>

                <Link to={"/sign-in"}>
                    <div className={"btn btn-primary"}>Sign out</div>
                </Link>
            </div>
        )
    }
}

export default Profile;