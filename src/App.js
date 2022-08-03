import {useEffect, useRef, useState} from "react";
import TopBar from "./Components/TopBar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Alert from "./Alerts/Alert";
import Explore from "./Pages/Explore";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import {AiFillCopyrightCircle} from "react-icons/ai";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./Pages/Category";


function App() {
    const [curTheme, setCurTheme] = useState('cyberpunk');
    const showScrollRef = useRef(null);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setCurTheme(theme);
        }
    }, []);

    return (<>
        <div className={"flex flex-col justify-between flex-1 min-h-screen w-full overflow-hidden"} data-theme={curTheme}>
            <Alert showScrollRef={showScrollRef}/>
            <Router>
                <TopBar setTheme={setCurTheme}/>

                <Routes>
                    <Route path="/" element={<Explore showScrollRef={showScrollRef}/>}/>
                    <Route path="/offers" element={<Offers/>}/>
                    <Route path="/category/:categoryName" element={<Category/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>

                <Navbar/>
            </Router>

            <footer className={"flex justify-center items-center p-4 text-center pb-[10em] bg-base-300"}>
                <AiFillCopyrightCircle className={"text-primary mr-4"}/> YOU HAVE REACHED THE FOOT
            </footer>
        </div>

        <ToastContainer theme={"colored"}/>

    </>);
}

export default App;
