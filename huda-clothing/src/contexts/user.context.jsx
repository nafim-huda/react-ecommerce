import { createContext, useEffect, useReducer} from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import { 
    createUserDocumentFromAuth,
     onAuthStateChangedListener 
} from "../utils/firebase/firebase.utils";

// stores actual value(s) you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// const userReducer = (state, action) => {
//     console.log('dispatched')
//     console.log(action)
//     const { type, payload } = action;
//     switch(type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state, // spread the previous state object values
//                 currentUser: payload
//             }
//         default: // throw an error in case we receive a type that is not listed above
//             throw new Error(`Unhandled type ${type} in User Reducer`)
//     }
// }

// const INITIAL_STATE = {
//     currentUser: null
// }

// component that will give access to values to components that are wrapped inside
// children - represents components inside of our component tree that want access
// to values stored in this context
export const UserProvider = ({ children }) => {
    // const [{ currentUser }, dispatch] = useReducer(userReducer,INITIAL_STATE)

    // action-creator function that dispatches a set user action type with the user we want to set as the payload
    const setCurrentUser = (user) => {
        // dispatch() will take a action type and a corresponding payload(if defined) to update
        // any state values inside of our reducer
        // dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    //const [currentUser, setCurrentUser] = useState(null);
    // const value = { currentUser, setCurrentUser };

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
         //return unsubscribe
    }, [])
    const value = { }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/* 
    - Reducers reflect the current value for our state(corresponding to a context state)
    - Based off the state, action -> we determine what values to return off of our reducer

    const userReducer = (state, action) => {
        return {
            currentUser: {...}
        }
    }
*/