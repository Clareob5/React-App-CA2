import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const TopNavbar = (props) => {

   let logoutButton;
  
  if(props.loggedIn){
    logoutButton = <Button variant="contained" onClick={() => props.onLoggedIn(false)}>Logout</Button>
  }

  
  return (
    <>
      <Link to="/">Home</Link> |  
      <Link to="/restaurants">Restaurants</Link> | 
      {logoutButton}
    </>
  )
}

export default TopNavbar


