import React from 'react';
import {MdOutlineLocalOffer, MdOutlineExplore, MdPersonPin} from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const pathMatchRoute = (path) => {
        return location.pathname === path;
    }
    
    return (
        <div className={"3xl:container sm:max-w-[75%]   justify-evenly flex mb-4 shadow-2xl  fixed bottom-0 mx-auto inset-x-0 bg-base-100 rounded-xl"}>
            
            <div onClick={()=>{navigate("/")}} className={`${pathMatchRoute('/') ? 'text-accent' : 'hover:text-primary'} flex flex-col align-middle my-2 hover:cursor-pointer hover:bg-base-300 rounded-xl group`}>
                <MdOutlineExplore className={"mx-2 text-6xl"}/>
                <span className={"text-2xl text-center group-hover:underline decoration-wavy"}>Explore</span>
            </div>
            
            <div onClick={()=>{navigate("/offers")}} className={` ${pathMatchRoute('/offers') ? 'text-accent' : 'hover:text-primary'} flex flex-col align-middle my-2 hover:cursor-pointer hover:bg-base-300 rounded-xl group `}>
                <MdOutlineLocalOffer className={"mx-2 text-6xl"}/>
                <span className={"text-2xl text-center group-hover:underline decoration-wavy"}>Offers</span>
            </div>
            
            <div onClick={()=>{navigate("/profile")}} className={`${pathMatchRoute('/profile') ? 'text-accent' : 'hover:text-primary'} flex flex-col align-middle my-2 hover:cursor-pointer hover:bg-base-300 rounded-xl group`}>
                <MdPersonPin className={"mx-2 text-6xl"}/>
                <span className={"text-2xl text-center group-hover:underline decoration-wavy"}>Profile</span>
            </div>
        </div>
    );
}

export default Navbar;