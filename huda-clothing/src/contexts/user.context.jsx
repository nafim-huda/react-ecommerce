import { createContext, useState } from "react";

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
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}