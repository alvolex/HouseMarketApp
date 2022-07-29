import React from 'react';
import {Link} from "react-router-dom";

function Profile() {
    return (
        <div className={"container mx-auto flex-1 flex align-middle justify-center"}>
            <h1>Profile</h1>
            
            <Link to={"/sign-in"}>
                <div className={"btn btn-primary"}>Sign in</div>
            </Link>
        </div>
    );
}

export default Profile;