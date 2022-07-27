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
            
            <div className={"container mx-auto"}>
                
            </div>
        </div>
    );
}

export default App;
