import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'


import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

import { GlobalStyle } from "./global.styles";

/* Lazy Import(s) */
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);
const Navigation = lazy(() => 
  import('./routes/navigation/navigation.component')
);
const Shop = lazy(() => 
  import('./routes/shop/shop.component')
);
const Checkout = lazy(() => 
  import('./routes/checkout/checkout.component')
);

/* Sequential Import(s) */
  // import Home from "./routes/home/home.component";
  // import Authentication from './routes/authentication/authentication.component';
  // import Navigation from './routes/navigation/navigation.component';
  // import Shop from './routes/shop/shop.component';
  // import Checkout from './routes/checkout/checkout.component';




const App = () => {
  // dispatches actions to root reducer -> therfore only one dispatch inside of our entire redux application
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])


  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

/* 
  We need to nest all of our routes in a <Routes> component
    The <Route> component will look for a URL to match that matches value specified
    in path attribute -> the route component listed in the element attribute will be rendered
    once a URL matches the path attribute value 

     
    The * character will match any wildcards after /shop -> render any child routes inside
    of the /shop parent route


    Dynamic Imports:
      - Modern JS feature
      - Currently our imports are actually imported sequentially 
      - A dynamic import is similar to an async-await
      ex.)
      // Standard Import
        import Home from ''
        // Dynamic Import
        const Home = await import();

      How does React perform a dynamic import?
      const Home = lazy(() => import());
      <Suspense>
        // All of <Routes> and <Route> components
      </Suspense>
      - essentially React will not fetch the component until it is required 
*/
