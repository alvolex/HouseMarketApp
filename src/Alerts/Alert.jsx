import React, {useEffect, useState} from 'react';
import {TbArrowTopTail} from "react-icons/tb";

function Alert({showScrollRef}) {
    const [showGoUp, setShowGoUp] = useState(false);  
    
    useEffect(() => {
        window.addEventListener("scroll", () => {            
            const scrollTop = window.pageYOffset;
            
            if (showScrollRef?.current?.offsetTop){
                const h1Top = showScrollRef?.current.offsetTop;

                if (scrollTop > h1Top) {
                    setShowGoUp(true);
                } else {
                    setShowGoUp(false);
                }
            }else {
                setShowGoUp(false);
            }
        })
    }, []);
    
    return (
        <div>
            {showGoUp && (<div className="invisible sm:visible toast toast-bottom toast-end hover:cursor-pointer" onClick={() => {
                window.scrollTo(0, 0)
            }}>
                <div className="alert alert-success">
                    <TbArrowTopTail className={"animate-pulse "}/>
                </div>
            </div>)}
        </div>
    );
}

export default Alert;