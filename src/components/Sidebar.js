import { useContext } from 'react';
import { Link } from 'react-router-dom'
import {Box, CssBaseline,Typography,Button,ListItem,Drawer,AppBar,Toolbar,List,Divider} from '@mui/material'
import TopNav from './TopNav'
import { UserContext } from '../UserContext';


const SideBar = (props) => {
  const { user } = useContext(UserContext);
  const drawerWidth = 240;
  let logoutButton;
  // if(props.loggedIn){
  //   logoutButton = <Button variant="contained" onClick={() => props.onLoggedIn(false)}>Logout</Button>
  // }
  console.log(user);


  return (    
      <>
      <CssBaseline />
      <TopNav loggedIn={props.loggedIn} onLoggedIn={props.onLoggedIn}/>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#423b3b' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem button>
                    <Link to="/" className='link'>Home</Link>
              </ListItem>
               <ListItem button >
                    <Link to="/restaurants" className='link'>Restaurants</Link>
              </ListItem>
            {props.loggedIn ? 
            <>
            <ListItem button >
            <Link to="/account" className='link'>Account</Link>
            </ListItem>
            <ListItem button >
              <Link to="/" className='link'>Settings</Link>
            </ListItem>
            </>
             : " "}
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>  
     
      </>
  );
}

export default SideBar




