import { useContext, useState, useEffect } from 'react';
import axios from '../config/index.js'
import { Link } from 'react-router-dom'
import { Typography, Button, AppBar, Toolbar, Box } from '@mui/material'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router';

const TopNavbar = (props) => {
  //const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({}) ;

  let logoutButton;
  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  let id = localStorage.getItem('user')

  // if (props.loggedIn) {
  //   logoutButton = <Button variant="contained" onClick={logout}>ut</Button>
  // }
  // console.log(props.loggedIn);
  // console.log(currentUser)
  useEffect(() => {
    axios.get(`/users/${id}`, {
      email: currentUser.email
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
         console.log(response.data)
         setCurrentUser(response.data.user)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  },[])


  const logout = () => {
    console.log(currentUser)
    // axios.get('/users/logout', {
    //   email: currentUser.email
    // }, {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // })
    //   .then(response => {
    //      console.log(response.data)
          props.onLoggedIn(false)
        localStorage.removeItem('token')
    //      navigate('/')
    //   })
    //   .catch(err => {
    //     console.log(`Error: ${err}`)
    //   })
  }



  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ff6640' }}>
        <Toolbar>
          <Typography variant="h6" variant="h6" sx={{ flexGrow: 1 }} component="div">
            Restaurant Application
          </Typography>
          <div>
            {props.loggedIn ?
              <Box>
                <Typography>{currentUser.name}</Typography>
                <Button className="logoutBtn" onClick={logout}>Logout</Button>
              </Box> : <Link to='/login'>Login/SignUp</Link>}
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopNavbar


