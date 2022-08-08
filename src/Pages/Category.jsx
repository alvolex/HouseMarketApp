import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {collection, query, where, getDocs, orderBy, limit, startAfter} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../Components/Spinner";
import {toast} from "react-toastify";
import ListingItem from "../Components/ListingItem";

const Category = () => {
    const {categoryName} = useParams();
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {

            try {
                const categoryRef = collection(db, "listings");
                const q = await query(categoryRef, where("type", "==", categoryName), orderBy("timestamp", "desc"), limit(10));

                const curListings = [];

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    curListings.push({id: doc.id, data: doc.data()});
                });

                setLoading(false);
                setListings(curListings);

            } catch (error) {
                toast.error('Something went wrong, please try again.');
            }
        })();

    }, [categoryName]);

    if (listings === null) {
        return <div className={"container mx-auto flex-1 flex-col flex justify-center"}><Spinner/></div>;
    }

    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>
            <div className={"w-full"}>
                <h1 className={"mb-6 text-6xl font-bold  text-center bg-gradient-to-r from-primary to-error via-secondary mb-6 bg-clip-text text-transparent"}>
                    Places for {categoryName}!
                </h1>

                {loading ? (<Spinner/>) : listings && listings.length > 0 ? (
                    <>
                        <main>
                            <ul className={"flex justify-center flex-wrap"}>
                                {listings.map((listing) => (
                                    <ListingItem key={listing.id} listing={listing}/>
                                ))}
                            </ul>
                        </main>
                    </>
                ) : (
                    <p className={"text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-error via-secondary mb-6 bg-clip-text text-transparent"}>There
                        are currently no listings for {categoryName}..</p>
                )}
            </div>
        </div>
    );
};

export default Category;