import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import Spinner from "./Spinner";
import {getAuth} from "firebase/auth";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";

const Listing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const loc = useLocation();
    const params = useParams();
    const auth = getAuth();

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
    }, [params.listingId])
    
    return (
        <div className={"container mx-auto flex-1 flex flex-col items-center"}>
            {listing ? (<>
                    <div className={"w-full text-center m-auto"}>
                        <header>
                            <h1
                                className={"text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-error via-secondary pb-4 pt-2 mb-6 sm:mb-0 overflow-hidden"}>
                                {listing.address}
                            </h1>
                        </header>


                            <Carousel dynamicHeight={true} showArrows={false}  showStatus={false} className={"mb-6 mx-16"}>
                                {listing.imageUrls.map((image) => (
                                    <div key={image.toString()} className={"h-64"}>
                                        <img src={image} alt={"House"} className={"rounded-2xl "}/>
                                    </div>
                                ))}
                            </Carousel>

                        
                        
                        
                        <div className={"md:grid-cols-2 md:gap-6 md:grid text-center border border-primary rounded-xl mb-6 bg-neutral w-fit px-16 py-8 m-auto"}>
                            {/*Left side*/}
                            <div className={"break-all mr-6 flex justify-end"}>
                                <div className={"w-fit text-start"}>
                                    <p className={"text-xl"}><span className={"text-primary"}> Listing:</span> {listing.name}</p>
                                    <p className={"text-xl"}><span
                                        className={"text-primary"}> Price:</span> ${listing.offer ? listing.discountedPrice : listing.regularPrice} {listing.type === 'rent' ? '/Mo' : ''}
                                    </p>
                                    <p className={"text-xl"}><span className={"text-primary"}> Address:</span> {listing.address} </p>
                                </div>
                            </div>
                            
                            {/*Right side*/}
                            <div className={"break-all text-start ml-6"}>
                                <span className="md:hidden divider"></span>
                                <p className={"text-xl"}><span className={"text-primary"}> Bedrooms:</span> {listing.bedrooms}</p>
                                <p className={"text-xl"}><span className={"text-primary"}> Bathrooms:</span> {listing.bathrooms}</p>
                                <p className={"text-xl"}><span className={"text-primary"}> Parking:</span> {listing.parking ? 'Yes' : 'No'}</p>
                                <p className={"text-xl"}><span className={"text-primary"}> Furnished:</span> {listing.furnished ? 'Yes' : 'No'}</p>
                            </div>
                        </div>

                        {auth.currentUser?.uid !== listing.userRef && (
                            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className={"btn btn-primary"}>Contact seller</Link>
                            )}
                    </div>
                </>)
                : loading ? <Spinner/> : 'Listing could not be found.'}
        </div>
    );
};

export default Listing;