import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RiLockPasswordFill, RiMailFill} from "react-icons/ri";
import {validateEmail} from "../Helpers/EmailValidation";

import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {db} from "../firebase.config";
import {toast} from "react-toastify";

function SignIn() {
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = formData;

    const login = async (e) => {
        e.preventDefault();
        try{
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);            
            const user = userCredential.user;

            navigate("/");
        } catch(error){
            toast.error('Invalid email or password');
        }   
    }

    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>
            <div className="card shadow-md shadow-secondary bg-base-300 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-6"}>LOGIN</h1>
                
                <form>
                    
                
                <div className="card-body px-6 pb-6 pt-0">
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Email</span>
                        </label>
                        <div className={"relative flex justify-end items-center"}>
                            <RiMailFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                            <input type="text" onFocus={() => {
                                setValidEmail(true)
                            }} onBlur={() => {
                                if (email.length > 0) {
                                    setValidEmail(validateEmail(email))
                                } else {
                                    setValidEmail(true)
                                }
                            }} value={email} onChange={(e) => {
                                setFormData({email: e.target.value, password: password})
                            }} placeholder={`E-mail`} className={`${validEmail ? '' : 'border-error'} pl-8 input input-bordered w-full`}/>
                        </div>

                    </div>
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Password</span>
                        </label>
                        <div className={"relative flex justify-end items-center"}>
                            <RiLockPasswordFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                            <input value={password} onChange={(e) => setFormData({email: email, password: e.target.value})} type="password" placeholder="Password" className="pl-8 input input-bordered w-full"/>
                        </div>
                        <label className="label justify-end">
                            <Link to={"/forgot-password"} className="label-text-alt link link-hover text-primary font-bold italic">Forgot
                                password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary font-bold text-xl" onClick={login}>Login</button>
                    </div>
                </div>
                </form>
            </div>

            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Don't have an account? 
                <Link to={"/sign-up"} className={"origin-center -rotate-[8deg] hover:rotate-[0deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1  ml-4 shadow-sm shadow-primary hover:shadow-none"}>Signup!</Link>
            </h1>
        </div>
    );
}

export default SignIn;