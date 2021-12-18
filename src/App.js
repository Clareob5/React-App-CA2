import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react';

import "./App.css";

//Components
import Sidebar from './components/Sidebar'

import SignUpSignIn from './pages/SignUpSignIn';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import RestaurantsIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsEdit from './pages/restaurants/Edit';
import Account from './pages/users/Account';
import { UserContext } from './UserContext'

import Box from '@mui/material/Box';


const App = () => {


  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  let authRestaurants

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true)
    }
  }, [])

  const onLoggedIn = (auth, token) => {
    setLoggedIn(auth)
    if (auth) {
      console.log(token)
      console.log(user)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    else {
      // console.log('hiiiiii')
      // axios.post('/users/logout', {
      //   email: user.email,
      //   password: user.password
      // }, {
      //   headers: {
      //     "Authorization": `Bearer ${token}`
      //   }

      // })
      //   .then(response => {
      //     console.log(response.data)
           setLoggedIn(false)
           localStorage.removeItem('token')
      //     navigate('/')
      //   })
      //   .catch(err => {
      //     console.log(`Error: ${err}`)
      //   })
        }
    }
 


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
      <UserContext.Provider value={userValue}>
        <Sidebar onLoggedIn={onLoggedIn} loggedIn={loggedIn} />

        <Routes>
          <Route path="/" element={<Home onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/register" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/login" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/restaurants" element={<RestaurantsIndex onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
          {authRestaurants}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </Box>
  </Router>
);
}

export default App;