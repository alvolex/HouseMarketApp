import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import Spinner from "./Spinner";

const Listing = () => {
    const loc = useLocation();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setListing(loc.state?.data);

        if (!listing) {
            (async () => {
                setLoading(true);
                const docRef = doc(db, "listings", params.listingId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setListing(docSnap.data());
                } else {
                    toast.error("Listing not found");
                }

                setLoading(false);
            })();
        }
    }, [])

    return (
        <div className={"container mx-auto flex-1 flex flex-col mt-6 items-center"}>
            {listing ? (<>
                    <div>
                        {listing.address}
                    </div>
                </>)
                : loading ? <Spinner/> : 'Listing could not be found.'}
        </div>
    );
};

export default Listing;