function Explore({showScrollRef}) {    
    return (
        <div className={"container mx-auto flex-1 flex align-middle justify-center"}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-6xl font-bold mt-6 text-center bg-gradient-to-r from-primary to-error via-secondary mb-6"}>
                    I AM THE MAIN CONTENT
                </h1>
                <h1 className={"text-6xl font-bold text-center bg-gradient-to-r from-primary to-error via-secondary mb-6"}>
                    NO, I AM THE MAIN CONTENT
                </h1>

                <h1 ref={showScrollRef}
                    className={"text-6xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-error via-secondary mb-6"}>
                    ACTUALLY, I AM THE MAIN CONTENT
                </h1>
            </div>
        </div>
    );
}

export default Explore;