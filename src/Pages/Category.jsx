import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const Category = () => {
    const {categoryName} = useParams();
    
    useEffect(() => {

    }, []);
    
    return (
        <div className={"container mx-auto flex-1 flex-col flex justify-center"}>
            {categoryName}
        </div>
    );
};

export default Category;