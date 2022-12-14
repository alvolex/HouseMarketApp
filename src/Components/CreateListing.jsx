import React, {useEffect, useRef, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {useNavigate} from "react-router-dom";
import Spinner from "./Spinner";
import {toast} from "react-toastify";
import {db} from "../firebase.config";
import {serverTimestamp, addDoc, collection} from "firebase/firestore";

const CreateListing = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: [],
    });
    const {type, name, description, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images} = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);
    
    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    navigate("/sign-in");
                }

                setFormData({...formData, userRef: user.uid});
                setLoading(false);
            })
        }


        return () => {
            isMounted.current = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (name === '' || description === '' || address === '') {
            toast.error('Please fill in all fields');
            return;
        }        
        if(images.length > 6){
            toast.error('You can only upload 6 images');
            return;
        }        
        if(images.length < 1){
            toast.error('You must upload at least 1 image');
            return;
        }        
        if(discountedPrice > regularPrice){
            toast.error('Discounted price can\'t be higher than regular price');
            return;
        }
        
        //Start uploading images to firestore
        setLoading(true);
        const imageUrls = await Promise.all(
            [...images].map(async (image) => uploadImg(image))
        ).catch(() => {
            toast.error('Something went wrong, please try again.');
        })        
        
        //Create listing in firestore
        const submitData = {...formData, imageUrls, timestamp: serverTimestamp()};
        delete submitData.images;
        !submitData.offer && delete submitData.discountedPrice;
        
        const listingRef = await addDoc(collection(db, "listings"), submitData);

        setLoading(false);
        toast.success('Listing created successfully!');
        
        navigate(`/listing/${listingRef.id}`, {state: {data:submitData}});        
    }    
    
    const uploadImg =  (img) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const fileName = `${auth.currentUser.uid}_${img.name}_${uuidv4()}`;
            const imagesRef = ref(storage, 'images/' + fileName);
            
            const uploadTask = uploadBytesResumable(imagesRef, img);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(imagesRef).then(url => {
                        resolve(url);
                    })
                }
            );
        })
    }    

    const onMutate = (e) => {
        if (e.target.value === 'true' || e.target.value === 'false') {
            let boolValue = e.target.value === 'true';
            setFormData({...formData, [e.target.id]: boolValue});
        } else if (e.target.id === 'discountedPrice' || e.target.id === 'regularPrice' || e.target.id === 'bathrooms' || e.target.id === 'bedrooms') {
            setFormData({...formData, [e.target.id]: parseFloat(e.target.value)});
        } else if(e.target.files){
            setFormData({...formData, [e.target.id]: e.target.files});
        }       
        else {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
    }

    return (
        <div className={"container mx-auto flex-1 flex flex-col mt-6 items-center"}>
            {loading ? <Spinner/> :
                <>
                    <header>
                        <h1
                            className={"text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-error via-secondary mx-auto pb-4 pt-2 mb-6 sm:mb-0 overflow-hidden"}>
                            Create Listing
                        </h1>
                    </header>

                    <main>
                        <form onSubmit={onSubmit}
                              className={"form-control *w-full max-w-sm*/ p-6 items-center border border-primary rounded-xl mb-6 bg-neutral pb-6 lex justify-center"}>

                            <div className={"lg:grid-cols-2 lg:gap-6 lg:grid text-center"}>
                                {/*Left side*/}
                                <div>
                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Sell / Rent</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" id={"type"} defaultValue={"Select an option"}
                                            onChange={onMutate}>
                                        <option disabled>Select an option</option>
                                        <option value={"sale"}>Sell</option>
                                        <option value={"rent"}>Rent</option>
                                    </select>
                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Listing name</span>
                                    </label>
                                    <input id={"name"} type="text" placeholder="Listing name" className="input input-bordered w-full max-w-xs"
                                           onChange={onMutate} value={name}/>

                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Adress</span>
                                    </label>
                                    <input id={"address"} type="text" placeholder="Lincoln Ave. 1337"
                                           className="input input-bordered w-full max-w-xs"
                                           onChange={onMutate} value={address}/>

                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Listing description</span>
                                    </label>
                                    <input id={"description"} type="text" placeholder="A nice little place!"
                                           className="input input-bordered w-full max-w-xs" onChange={onMutate} value={description}/>

                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Bedrooms</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" id={"bedrooms"} onChange={onMutate}
                                            defaultValue={"Select an option"}>
                                        <option disabled>Select an option</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <label className="label ">
                                        <span className="label-text text-primary mx-auto">Bathrooms</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" id={"bathrooms"} onChange={onMutate}
                                            defaultValue={"Select an option"}>
                                        <option disabled>Select an option</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>

                                {/*Right side*/}
                                <div className={"flex flex-col"}>
                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Parking</span>
                                    </label>
                                    <div
                                        className={"flex flex-row border border rounded-xl px-2 py-[0.2em] border-primary/50 max-w-[50%] mx-auto"}>
                                        <div className="form-control mr-4">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">Yes</span>
                                                <input id={"parking"} type="radio" name="radio-Parking"
                                                       className="radio checked:bg-info radio-primary" value={true}
                                                       checked={parking} onChange={onMutate}/>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">No</span>
                                                <input id={"parking"} type="radio" name="radio-Parking"
                                                       className="radio checked:bg-error radio-primary"
                                                       value={false} checked={!parking} onChange={onMutate}/>
                                            </label>
                                        </div>
                                    </div>

                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Furnished</span>
                                    </label>
                                    <div
                                        className={"flex flex-row border border rounded-xl px-2 py-[0.2em] border-primary/50 max-w-[50%] mx-auto"}>
                                        <div className="form-control mr-4">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">Yes</span>
                                                <input id={"furnished"} type="radio" name="radio-furnished"
                                                       className="radio checked:bg-info radio-primary"
                                                       value={true} checked={furnished} onChange={onMutate}/>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">No</span>
                                                <input id={"furnished"} type="radio" name="radio-furnished"
                                                       className="radio checked:bg-error radio-primary"
                                                       value={false} checked={!furnished} onChange={onMutate}/>
                                            </label>
                                        </div>
                                    </div>


                                    <label className="label">
                                        <span className="label-text text-primary mx-auto">Price: </span>
                                    </label>
                                    <label className="input-group flex justify-center">
                                        <span>Price</span>
                                        <input id={"regularPrice"} type="text" placeholder="10"
                                               className={`max-w-[30%] input input-bordered ${isNaN(regularPrice) ? 'border border-error' : 'border-none'} `}
                                               onChange={onMutate} value={regularPrice > 0 ? regularPrice : ''}/>
                                        <span>${type === 'rent' ? '/Mo' : ''}</span>
                                    </label>


                                    <label className="label">
                                        <span className="label-text text-primary mx-auto ">Special offer?</span>
                                    </label>
                                    <div
                                        className={"flex flex-row border border rounded-xl px-2 py-[0.2em] border-primary/50 max-w-[50%] mx-auto"}>
                                        <div className="form-control mr-4">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">Yes</span>
                                                <input id={"offer"} type="radio" name="radio-offer"
                                                       className="radio checked:bg-info radio-primary" value={true}
                                                       checked={offer} onChange={onMutate}/>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text text-primary mx-auto mr-2">No</span>
                                                <input id={"offer"} type="radio" name="radio-offer"
                                                       className="radio checked:bg-error radio-primary" value={false}
                                                       checked={!offer} onChange={onMutate}/>
                                            </label>
                                        </div>
                                    </div>

                                    {offer && <>
                                        <label className="label">
                                            <span className="label-text text-primary mx-auto">Discounted price: </span>
                                        </label>
                                        <label className="input-group flex justify-center">
                                            <span>Price</span>

                                            <input id={"discountedPrice"} type="text" placeholder="10"
                                                   className={`max-w-[30%] input input-bordered ${discountedPrice >= regularPrice ? 'border border-error' : 'border-none'}  `}
                                                   onChange={onMutate} value={discountedPrice > 0 ? discountedPrice : ''}/>
                                            <span>${type === 'rent' ? '/Mo' : ''}</span>
                                        </label>
                                    </>}

                                    <label className="label">
                                        <span className="label-text text-primary mx-auto ">Images: </span>
                                    </label>
                                    <label className="input-group label block w-full mb-6">
                                        <input id={"images"} type="file"
                                               className={"text-sm text-primary file:mr-5 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-secondary hover:file:cursor-pointer hover:file:bg-secondary hover:file:text-primary"}
                                               onChange={onMutate}
                                               multiple
                                               required
                                               max='6'
                                               accept="image/*"/>
                                    </label>
                                    
                                    <button className="btn btn-primary btn-block lg:mt-auto mt-6">Submit</button>
                                </div>
                            </div>
                        </form>
                    </main>
                </>
            }
        </div>
    );
};

export default CreateListing;