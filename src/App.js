import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';

import "./App.css";

//Components
import TopNavbar from './components/TopNav'
import Sidebar from './components/Sidebar'

import SignUpSignIn from './pages/SignUpSignIn';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import RestaurantsIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsAdd from './pages/restaurants/Add';
import RestaurantsEdit from './pages/restaurants/Edit';

import Box from '@mui/material/Box';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  let authRestaurants

   useEffect(() => {
        if( localStorage.getItem('token')){
          setLoggedIn(true)
        }
    },[])

  const onLoggedIn = (auth, token) => {
    setLoggedIn(auth)
    if(auth) {
      console.log(token)
      localStorage.setItem('token', token)
    }
    else{
      
        // axios.post('/users/logout,{
        // , {
        //      headers: {
        //          "Authorization": `Bearer ${token}`
        //      }
            
        // })
        // .then(response => {
        //          console.log(response.data)
        //          navigate(`/restaurants/${response.data.restaurant._id}`, {replace: true})
        //      })
        //      .catch(err => {
        //          console.log(`Error: ${err}`)
        //      })
        //     }
      localStorage.removeItem('token')
    }
 
  }


  if (loggedIn) {
    authRestaurants = (
      <>
        <Route path="/restaurants/:id" element={<RestaurantsShow />} />,
        <Route path="/restaurants/add" element={<RestaurantsAdd />} />,
        <Route path="/restaurants/:id/edit" element={<RestaurantsEdit />} />
      </>
    )
  }

  return (
    <Router>
      <TopNavbar onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />
      <Box sx={{ display: 'flex' }}   >
      <Sidebar onLoggedIn={onLoggedIn} loggedIn = {loggedIn}/>
      <Routes>
        <Route path="/" element={<Home onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />} />
        <Route path="/register" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />} />
        <Route path="/login" element={<SignUpSignIn onLoggedIn={onLoggedIn} loggedIn = {loggedIn} />} />
        <Route path="/restaurants" element={<RestaurantsIndex onLoggedIn={onLoggedIn} loggedIn={loggedIn} />} />
        {authRestaurants}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Box>
    </Router>
  );
}

export default App;