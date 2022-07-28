import React from 'react';
import {useNavigate} from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    
    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>             
            <div className="card shadow-md shadow-secondary bg-base-300 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-6"}>LOGIN</h1>
                <div className="card-body px-6 pb-6 pt-0">
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Email</span>
                        </label>
                        <input type="text" placeholder="E-mail" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered"/>
                        <label className="label justify-end">
                            <a href="#" className="label-text-alt link link-hover text-primary font-bold italic">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary font-bold text-xl">Login</button>
                    </div>
                </div>
                
                
            </div>

            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Don't have an account? <p onClick={()=>{navigate("/sign-up")}} className={"origin-center -rotate-[8deg] hover:rotate-[0deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1  ml-4 shadow-sm shadow-primary hover:shadow-none"}>Signup!</p></h1>
        </div>
    );
}

export default SignIn;