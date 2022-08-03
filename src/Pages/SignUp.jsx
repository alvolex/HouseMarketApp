import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RiLockPasswordFill, RiMailFill, RiFileUserFill} from "react-icons/ri";
import {validateEmail} from "../Helpers/EmailValidation";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

import {db} from "../firebase.config";
import {toast} from "react-toastify";
import Oauth from "../Components/Oauth";
import {FcGoogle} from "react-icons/fc";

function SignUp() {
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const {email, password, name} = formData;

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;
            updateProfile(auth.currentUser, {displayName: name})

            const formDataCopy = {...formData};
            delete formDataCopy.password;

            formDataCopy.timestamp = serverTimestamp();

            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, formDataCopy);

            navigate("/");
        } catch (error) {
            toast.error('Something went wrong, please try again.');
        }
    }

    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>

            <div className="card shadow-2xl bg-base-300 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent "}>SIGN UP</h1>
                <form>
                    <div className="card-body px-6 pb-6 pt-0">
                        <div className="form-control">

                            {/*Name*/}
                            <label className="label font-bold">
                                <span className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Name</span>
                            </label>
                            <div className={"relative flex justify-end items-center"}>
                                <RiFileUserFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                                <input type="text" placeholder={`John Doe`} className="pl-8 input input-bordered w-full" value={name}
                                       onChange={(e) => {setFormData({...formData, name: e.target.value})}}/>
                            </div>
                        </div>

                        <div className="form-control">

                            {/*EMAIL*/}
                            <label className="label font-bold">
                                <span
                                    className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Email</span>
                            </label>
                            <div className={"relative flex justify-end items-center"}>
                                <RiMailFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                                <input onBlur={() => {if (email.length > 0) {setValidEmail(validateEmail(email))}}}
                                       onFocus={() => {setValidEmail(true)}} type="text" value={email}
                                       onChange={(e) => {setFormData({...formData, email: e.target.value})}} placeholder={`E-mail`}
                                       className={`${validEmail ? '' : 'border-error'} pl-8 input input-bordered w-full`}/>
                            </div>
                        </div>
                        <div className="form-control">

                            {/*PASSWORD*/}
                            <label className="label font-bold">
                                <span
                                    className="label-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Password</span>
                            </label>
                            <div className={"relative flex justify-end items-center"}>
                                <RiLockPasswordFill className={"absolute left-0 ml-2 text-xl text-primary"}/>
                                <input type="password" placeholder={`Password`} className="pl-8 input input-bordered w-full" value={password}
                                       onChange={(e) => {setFormData({...formData, password: e.target.value})}}/>
                            </div>
                        </div>

                        {/*Sign up*/}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary font-bold text-xl" onClick={signUp}>Sign up!</button>
                        </div>
                        {/*Divider*/}
                        <div className="divider mb-0"></div>
                        {/*Social Login*/}
                        <div className="form-control ">
                            <div className="flex justify-center">
                                <div className="flex items-center">
                                    <Oauth />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Have an
                account? <Link to={"/sign-in"}
                               className={"origin-center -rotate-[8deg] hover:rotate-[0deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1 ml-4 shadow-sm shadow-primary hover:shadow-none"}>Login!</Link>
            </h1>
        </div>
    );
}

export default SignUp;