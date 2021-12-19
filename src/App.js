import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react';

import "./App.css";

//Components
import Navbar from './components/NavBars'
import SignUpSignIn from './pages/SignUpSignIn';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import RestaurantsIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsEdit from './pages/restaurants/Edit';
import Account from './pages/users/Account';
import RecipesIndex from './pages/Recipes';
import { UserContext } from './UserContext'

//style
import Box from '@mui/material/Box';


const App = () => {

  //states
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  let authRestaurants

  //get token and setting logged in to true
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true)
    }
  }, [])

   //setting token in local storage
  const onLoggedIn = (auth, token) => {
    setLoggedIn(auth)
    if (auth) {
      localStorage.setItem('token', token)
    }
    else {
        setLoggedIn(false)
        localStorage.removeItem('token')
        }
    }
 

//user cant access these routes if theya rent logged in 
if (loggedIn) {
  authRestaurants = (
    <>
      <Route path="/restaurants/:id" element={<RestaurantsShow />} />,
      <Route path="/restaurants/:id/edit" element={<RestaurantsEdit />} />
      <Route path="/account" element={<Account />} />
    </>
  )
}

return (
  <Router>
    <Box sx={{ display: 'flex' }}   >
      {/* context provider allows the value to me used by any compoent within the userCOntext.provider tags */}
      <UserContext.Provider value={userValue}>
        <Navbar onLoggedIn={onLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/register" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/login" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/restaurants" element={<RestaurantsIndex onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/recipes" element={<RecipesIndex />} />
          {authRestaurants}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </Box>
  </Router>
);
}

export default App;