import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'


import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { setCurrentUser } from "./store/user/user.action";


const App = () => {
  // dispatches actions to root reducer -> therfore only one dispatch inside of our entire redux application
  const dispatch = useDispatch();
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
        dispatch(setCurrentUser(user));
    })
     // react is complaining because it wants our dispatch as a side effect, 
     // although it will never actually update so we don't need to pass it
}, [])
  
  return (
    /* We need to nest all of our routes in a <Routes> component
    The <Route> component will look for a URL to match that matches value specified
    in path attribute -> the route component listed in the element attribute will be rendered
    once a URL matches the path attribute value */

    /* 
    The * character will match any wildcards after /shop -> render any child routes inside
    of the /shop parent route
    */
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
