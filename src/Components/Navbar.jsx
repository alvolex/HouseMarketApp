import React from 'react';
import {BsHouse} from "react-icons/bs";
import {GiPaintBucket} from "react-icons/gi";

function Navbar({setTheme}) {
    const randomTheme = () => {
        const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
        const randomIndex = Math.floor(Math.random() * themes.length);

        let randomTheme = themes[randomIndex]
        setTheme(randomTheme);
        localStorage.setItem('theme', randomTheme);
    }

    return (
        <div className={"navbar bg-base-300"}>
            <div className={"container mx-auto"}>                
                {/*Navbar LEFT*/}
                <div className={"navbar-start"}>
                    <div className="flex flex-row text-3xl">
                        <div className="hover:cursor-pointer flex">
                            <BsHouse className={"text-primary-focus my-auto"}/>
                            <h1 className={"  invisible sm:visible text-transparent bg-clip-text bg-gradient-to-r from-primary-focus to-secondary-focus"}>HOUSEMARKET</h1>
                        </div>                        
                    </div>
                </div>

                {/*Navbar RIGHT*/}
                <div className={"navbar-end flex justify-items-end"}>
                    <div onClick={randomTheme} className="btn btn-primary btn-sm ml-8 mt-auto">
                        <GiPaintBucket className={"mr-2 text-info text-lg "}/> Randomize Theme
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;