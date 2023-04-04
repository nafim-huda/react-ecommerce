import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const  CategoriesContext = createContext({
    categoriesMap: {}, // Why obj rather than array? We are interfacing with an the keys
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        /* In general, we want to wrap any async calls inside of an async function
         rather than defining the callback as async 
        */
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    }, [])
    const value = { categoriesMap }
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}