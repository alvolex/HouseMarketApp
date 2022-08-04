import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {collection, query, where, getDocs, orderBy, limit, startAfter} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../Components/Spinner";
import {toast} from "react-toastify";
import {list} from "postcss";

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

    }, []);

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
                                    <li key={listing.id}>
                                        <div className={"card w-96 bg-base-100 shadow-md shadow-secondary border-2 border-secondary mx-3 mb-6"}>
                                            <figure><img
                                                src={listing.data?.imageUrls[0] ? listing.data?.imageUrls[0] : 'https://images.unsplash.com/photo-1586446911746-3038e9751ac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                                                alt="house picture"/></figure>
                                            <div className="card-body items-center text-center bg-neutral">
                                                <h2 className="card-title text-3xl font-bold  text-center bg-gradient-to-r from-primary to-error via-secondary bg-clip-text text-transparent">{listing.data.location}</h2>
                                                <p className={"text-primary"}>{listing.data.name}</p>
                                                <p className={"text-primary"}>{listing.data.discountedPrice < listing.data.regularPrice ? (
                                                    <span className={"text-success"}>{listing.data.discountedPrice} <span
                                                        className={"text-error line-through"}>{listing.data.regularPrice}</span></span>) : (listing.data.regularPrice)} kr</p>
                                                <Link to={`/listing/${listing.id}`} state={listing} class="card-actions justify-center">
                                                    <button
                                                        className="btn btn-primary origin-center -rotate-[4deg] hover:rotate-[0deg] italic btn btn-primary hover:cursor-pointer relative bottom-1 shadow-md shadow-secondary hover:shadow-none">More
                                                        details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
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