import {useEffect, useState} from "react";
import Navbar from "./Components/Navbar";

function App() {
    const [curTheme, setCurTheme] = useState('cyberpunk');
    
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setCurTheme(theme);
        }
    }, []);   
    
    return (        
        <div className={"flex flex-col justify-between flex-1 min-h-screen w-full overflow-hidden"} data-theme={curTheme}>
            <Navbar setTheme={setCurTheme} />
            
            <div className={"container mx-auto flex-1 flex align-middle justify-center"}>
                <div className={"flex flex-col justify-between items-center"}>
                    <h1 className={"text-6xl font-bold mt-6"}>
                        I AM THE MAIN CONTENT
                    </h1>
                    <h1 className={"text-6xl font-bold"}>
                        I AM THE MAIN CONTENT
                    </h1>
                    <h1 className={"text-6xl font-bold mb-6"}>
                        I AM THE MAIN CONTENT
                    </h1>
                </div>                
            </div>
            
            <footer className={"flex justify-center items-center p-4"}>
                I AM A FOOT
            </footer>
        </div>
    );
}

export default App;
