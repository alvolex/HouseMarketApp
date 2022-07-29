﻿import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RiLockPasswordFill, RiMailFill, RiFileUserFill} from "react-icons/ri";
import {validateEmail} from "../Helpers/EmailValidation";

function SignUp() {
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = formData;

    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>

            <div className="card shadow-2xl bg-base-300 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent "}>SIGN UP</h1>
                <div className="card-body px-6 pb-6 pt-0">
                    <div className="form-control">

                        {/*Name*/}
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Name</span>
                        </label>
                        <div className={"relative flex justify-end items-center"}>
                            <RiFileUserFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                            <input type="text" placeholder={`John Doe`} className="pl-8 input input-bordered w-full"/>
                        </div>
                    </div>                    
                    
                    <div className="form-control">
                        
                        {/*EMAIL*/}
                        <label className="label font-bold">                            
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Email</span>
                        </label>
                        <div className={"relative flex justify-end items-center"}>
                            <RiMailFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                            <input onBlur={()=>{if (email.length > 0) {setValidEmail(validateEmail(email))}}} onFocus={()=>{setValidEmail(true)}} type="text" value={email} onChange={(e)=>{setFormData({email: e.target.value, password: password})}} placeholder={`E-mail`} className={`${validEmail ? '' : 'border-error'} pl-8 input input-bordered w-full`}/>
                        </div>
                    </div>
                    <div className="form-control">
                        
                        {/*PASSWORD*/}
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Password</span>
                        </label>
                        <div className={"relative flex justify-end items-center"}>
                            <RiLockPasswordFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                            <input type="password" placeholder={`Password`} className="pl-8 input input-bordered w-full"/>
                        </div>
                    </div>                    
                    
                    {/*Sign up*/}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary font-bold text-xl" >Sign up!</button>
                    </div>
                </div>


            </div>

            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Have an account? <Link to={"/sign-in"} className={"origin-center -rotate-[8deg] hover:rotate-[0deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1 ml-4 shadow-sm shadow-primary hover:shadow-none"}>Login!</Link></h1>
        </div>
    );
}

export default SignUp;