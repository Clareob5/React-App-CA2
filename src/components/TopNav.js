import { Link } from 'react-router-dom'

const TopNavbar = (props) => {

   let logoutButton;
  
  if(props.loggedIn){
    logoutButton = <button onClick={() => props.onLoggedIn(false)}>Logout</button>
  }

  
  return (
    <div>
      <Link to="/">Home</Link> |  
      <Link to="/restaurants">Restaurants</Link> | 
      {logoutButton}
    </div>
  )
}

export default TopNavbar