import React, {useState} from 'react';
import {RiMailFill} from "react-icons/ri";
import {validateEmail} from "../Helpers/EmailValidation";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

function ForgotPassword() {    
    const [validEmail, setValidEmail] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
    });
    
    const {email} = formData;
    
    const resetPassword = async (e) => {
        e.preventDefault();
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent. Check your spam folder if you do not see it in your inbox.');

        } catch(error){
            toast.error("The specified email address is not registered.");
        }   
    }
    
    return (
        <div className={"container mx-auto flex-1 flex align-middle justify-center flex-col"}>
            <div className="card shadow-md shadow-secondary bg-base-300 w-4/5 md:w-1/2 mx-auto border-2 border-secondary">
                <h1 className={"mx-auto text-6xl pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-6 text-center"}>RESET PASSWORD</h1>

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
                                    setFormData({email: e.target.value})
                                }} placeholder={`E-mail`} className={`${validEmail ? '' : 'border-error'} pl-8 input input-bordered w-full`}/>
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary font-bold text-xl" onClick={resetPassword}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>

            <h1 className={"mx-auto text-2xl py-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center"}>Go back to login?
                <Link to={"/sign-in"} className={"origin-center -rotate-[8deg] hover:rotate-[0deg] italic btn btn-secondary hover:cursor-pointer relative bottom-1  ml-4 shadow-sm shadow-primary hover:shadow-none"}>Login!</Link>
            </h1>
        </div>
    );
}

export default ForgotPassword;