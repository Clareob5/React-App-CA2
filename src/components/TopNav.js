import { useState, useEffect , useContext} from 'react';
import axios from '../config/index.js'
import { Link } from 'react-router-dom'
import { Typography, Button, AppBar, Toolbar, Box } from '@mui/material'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNavbar = (props) => {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);

  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  let id = localStorage.getItem('user')

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
  }, [])


  const logout = () => {
    console.log(currentUser.email)
    axios.get('/users/logout', {
       headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        props.onLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // setCurrentUser(user)
        navigate('/')
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }



  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ff6640' }}>
        <Toolbar>
          <Typography variant="h6" variant="h6" sx={{ flexGrow: 1 }} component="div">
            Restaurant Haven
          </Typography>
          {props.loggedIn ?
            <>
              <AccountCircleIcon sx={{ margin: 1 }} />
              <Typography>
                <Link to='/account' className="link">{currentUser.name}</Link>                
              </Typography>
              <Box>
                <Button className="logoutBtn" onClick={logout}>Logout</Button>
              </Box>
            </>
            : <Link to='/login' className="link">Login/SignUp</Link>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopNavbar


