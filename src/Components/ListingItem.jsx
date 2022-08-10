import React from 'react';
import {Link} from "react-router-dom";
import {MdBathroom, MdBedroomParent, MdDelete, MdLocalParking} from "react-icons/md";

const ListingItem = ({listing, onDelete}) => {
    return (
        <li>
            <div className={"card w-96 bg-base-100 shadow-md shadow-secondary border-2 border-secondary mx-3 mb-6 h-auto"}>
                <figure><img
                    className={"lg:h-64 w-full object-cover"}
                    src={listing.data?.imageUrls[0] ? listing.data?.imageUrls[0] : 'https://images.unsplash.com/photo-1586446911746-3038e9751ac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                    alt="house picture"
                /></figure>
                
                <div className="card-body items-center text-center bg-neutral">
                    <h2 className="card-title text-3xl font-bold  text-center bg-gradient-to-r from-primary to-error via-secondary bg-clip-text text-transparent">{listing.data.address}</h2>
                    <p className={"text-primary"}>{listing.data.name}</p>
                    <div className={"grid grid-cols-2 gap-2 text-primary text-2xl"}>
                        <div className={"flex flex-row items-center text-center"}>
                            <MdBedroomParent/>
                            <p>{listing.data.bedrooms}</p> 
                        </div>
                        <div className={"flex flex-row items-center text-center"}>
                            <MdBathroom/>
                            <p>{listing.data.bathrooms}</p>
                        </div>
                    </div>
                    <p className={"text-primary"}>{(listing.data.offer && listing.data.discountedPrice < listing.data.regularPrice) ? (
                        <span className={"text-success"}>{listing.data.discountedPrice}kr <span
                            className={"text-error font-bold line-through inline-block -rotate-[6deg] animate-pulse"}>{listing.data.regularPrice}kr</span></span>) : (listing.data.regularPrice)} {listing.data.type === 'rent' && ' / month'}
                    </p>
                    <Link to={`/listing/${listing.id}`} state={listing} className="card-actions justify-center">
                        <button
                            className="btn btn-primary origin-center -rotate-[4deg] hover:rotate-[0deg] italic btn btn-primary hover:cursor-pointer relative bottom-1 shadow-md shadow-secondary hover:shadow-none">More
                            details
                        </button>
                    </Link>                    
                    
                    {onDelete && (
                        <div className={"mt-6 mb-0 w-full relative hover:cursor-pointer"} onClick={onDelete(listing.id, listing.name)}>
                        <MdDelete className={"text-xl text-error absolute right-0"}/>
                    </div>
                    )}
                </div>
            </div>
        </li>
    );
};

export default ListingItem;