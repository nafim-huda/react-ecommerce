import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'


import { onAuthStateChangedListener,
         createUserDocumentFromAuth,
         
        } from "./utils/firebase/firebase.utils";

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
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      //console.log('before dispatch ' + user.email)
      dispatch(setCurrentUser(user));
      //console.log('after dispatch' + user)
    })
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
