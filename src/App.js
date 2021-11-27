import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
//Components
import TopNavbar from './components/TopNav'

import Account from './pages/Account';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import RestaurantsIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsAdd from './pages/restaurants/Add';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

   useEffect(() => {
        if( localStorage.getItem('token')){
          setLoggedIn(true)
        }
    })

  const onLoggedIn = (auth, token) => {
    setLoggedIn(auth)
    if(auth) {
      localStorage.setItem('token', token)
    }
    else{
      localStorage.removeItem('token')
    }
 
  }

  return (
    <Router>
      <TopNavbar onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />
      <Routes>
        <Route path="/" element={<Home onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />} />
        <Route path="/restaurants" element={<RestaurantsIndex />} />
        <Route path="/restaurants/:id" element={<RestaurantsShow />} />
        <Route path="/restaurants/add" element={<RestaurantsAdd />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;