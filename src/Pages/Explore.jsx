import {Link} from "react-router-dom";

function Explore({showScrollRef}) {    
    return (
        <div className={"container mx-auto flex-1 flex align-middle justify-center"}>
            <div className={"w-full"}>
                <h1 ref={showScrollRef}
                    className={"text-6xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-error via-secondary mb-6 bg-clip-text text-transparent"}>
                    EXPLORE HOMES
                </h1>
                
                <div className={"mb-32"}>
                </div>

                <h1 
                    className={"text-3xl font-bold pb-6 text-center bg-gradient-to-r from-primary to-error via-secondary  bg-clip-text text-transparent"}>
                    CATEGORIES
                </h1 >
                <div className="grid grid-cols-2">
                    <Link to={'/category/rent'} className="justify-self-end shadow-md rounded-b-lg rounded-t-2xl m-4 bg-neutral group hover:border-b-primary hover:border-b-8 border-b-8 border-b-secondary max-w-sm">
                        <img alt={"rentable"} src={"https://images.unsplash.com/photo-1586446911746-3038e9751ac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} className={"rounded-t-2xl opacity-70 group-hover:opacity-100"}/>
                        <p className={"text-4xl text-center font-bold text-center bg-gradient-to-r from-primary to-error via-secondary bg-clip-text text-transparent my-2"}>
                            FOR RENT                          
                        </p>
                    </Link>
                    <Link to={'/category/sale'} className="shadow-md rounded-b-lg rounded-t-2xl m-4 bg-neutral group hover:border-b-primary hover:border-b-8 border-b-8 border-b-secondary max-w-sm">
                        <img alt={"for sale"} src={"https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} className={"rounded-t-2xl opacity-70 group-hover:opacity-100"}/>
                        <p className={" text-4xl text-center font-bold text-center bg-gradient-to-r from-primary to-error via-secondary bg-clip-text text-transparent my-2"}>
                            FOR SALE
                        </p>
                    </Link>
                </div>
            </div>            
        </div>
    );
}

export default Explore;