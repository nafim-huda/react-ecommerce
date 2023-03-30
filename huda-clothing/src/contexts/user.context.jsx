import { createContext, useState, useEffect} from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// stores actual value(s) you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});
// component that will give access to values to components that are wrapped inside
// children - represents components inside of our component tree that want access
// to values stored in this context
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // moment our UserProvider mounts -> sign out our user to prevent Firebase user staying
    // authenticated between refresh
    //signOutUser();

    useEffect(() => {
        // we need to unsubscribe upon our auth obj changing -> this is needed
        // to prevent memory leaks
        // currently we are logging the user whenever our auth state changes
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                // we are already handling the case of a user.uid existing but 
                // there is NO user snapshot(data) in the Firebase in our Firebase Utils
                // implementation 
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        // return unsubscribe
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}