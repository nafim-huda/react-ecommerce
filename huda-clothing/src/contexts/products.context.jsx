import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: []
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        /* In general, we want to wrap any async calls inside of an async function
         rather than defining the callback as async 
        */
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
        }
    }, [])
    const value = { products }
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}