import React from 'react';
import {useNavigate} from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    
    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>

            <div className="card shadow-2xl bg-base-100 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"}>Sign up</h1>
                <div className="card-body px-6 pb-6 pt-0">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Email</span>
                        </label>
                        <input type="text" placeholder="E-mail" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Repeat Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered"/>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary font-bold text-xl" >Sign up!</button>
                    </div>
                </div>


            </div>

            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Have an account? <p onClick={()=>{navigate("/sign-in")}} className={"origin-center -rotate-[8deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1 ml-4"}>Login!</p></h1>
        </div>
    );
}

export default SignUp;