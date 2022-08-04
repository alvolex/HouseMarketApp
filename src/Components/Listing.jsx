import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

const Listing = () => {
    const loc = useLocation();
    const listing = loc.state.data;

    useEffect(() => {
        if (listing) {
            console.log(listing);
        }
    }, [])

    return (
        <div className={"container mx-auto flex-1 flex flex-col mt-6 items-center"}>
            {listing ? (<>
                <div>
                    {listing.location}
                </div>
            </>) : 'Something went wrong.'}
        </div>
    );
};

export default Listing;