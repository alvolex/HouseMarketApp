import {useEffect, useState} from "react";

function App() {
    const [curTheme, setCurTheme] = useState('cyberpunk');
    
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setCurTheme(theme);
        }
    }, []);
    
    const randomTheme = () => {
        const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
        const randomIndex = Math.floor(Math.random() * themes.length);
        
        let randomTheme = themes[randomIndex]        
        setCurTheme(randomTheme);
        localStorage.setItem('theme', randomTheme);
    }
    
    return (
        <div className={"flex flex-col justify-between flex-1 min-h-screen w-full overflow-hidden"} data-theme={curTheme}>
            <div className={"container mx-auto"}>
                <div className={"flex flex-row justify-between"}>
                    <h1 className={"text-accent text-3xl font-semibold"}>MY APP</h1>
                    <div onClick={randomTheme} className="btn btn-primary ml-8">Randomize Theme</div>
                </div>                
            </div>
        </div>
    );
}

export default App;
