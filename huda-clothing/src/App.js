import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";

const App = () => {
  
  return (
    /* We need to nest all of our routes in a <Routes> component
    The <Route> component will look for a URL to match that matches value specified
    in path attribute -> the route component listed in the element attribute will be rendered
    once a URL matches the path attribute value */
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
