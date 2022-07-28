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
        <div className={"/*xl:container */ sm:max-w-[65%] flex justify-around shadow-2xl fixed bottom-0 mx-auto inset-x-0 bg-base-100 rounded-xl"}>            
           {/*EXPLORE*/}
            <div onClick={()=>{navigate("/")}} className={`${pathMatchRoute('/') ? 'text-primary bg-base-300' : 'hover:text-secondary opacity-60  hover:opacity-100 hover:bg-base-200'} w-full p-2 flex flex-col align-middle my-2 hover:cursor-pointer  rounded-xl group items-center mx-2`}>
                <MdOutlineExplore className={"mx-2 text-6xl"}/>
                <span className={"text-2xl text-center group-hover:underline decoration-dashed"}>Explore</span>                
            </div>
    
            {/*OFFERS*/}
            <div onClick={()=>{navigate("/offers")}} className={` ${pathMatchRoute('/offers') ? 'text-primary bg-base-300' : 'hover:text-secondary opacity-60 hover:opacity-100 hover:bg-base-200'} w-full p-2 flex flex-col align-middle my-2 hover:cursor-pointer  rounded-xl group items-center`}>
                <MdOutlineLocalOffer className={"mx-2 text-6xl"}/>
                <span className={"text-2xl text-center group-hover:underline decoration-dashed"}>Offers</span>
            </div>
            
            {/*PROFILE*/}
            <div onClick={()=>{navigate("/profile")}} className={`${pathMatchRoute('/profile') ? 'text-primary bg-base-300' : 'hover:text-secondary opacity-60 hover:opacity-100 hover:bg-base-200'} w-full p-2 flex flex-col align-middle my-2 hover:cursor-pointer  rounded-xl group items-center mx-2`}>
                <MdPersonPin className={"mx-2 text-6xl "}/>
                <span className={"text-2xl text-center group-hover:underline decoration-dashed"}>Profile</span>
            </div>
        </div>
    );
}

export default Navbar;