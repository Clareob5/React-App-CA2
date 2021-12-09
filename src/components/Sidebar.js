import { Link } from 'react-router-dom'
import {Box, CssBaseline,Typography,Button,ListItem,Drawer,AppBar,Toolbar,List,Divider} from '@mui/material'




const SideBar = (props) => {
  const drawerWidth = 240;
  let logoutButton;
  if(props.loggedIn){
    logoutButton = <Button variant="contained" onClick={() => props.onLoggedIn(false)}>Logout</Button>
  }



  return (    
      <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ff6640' }}>
        <Toolbar>
          <Typography variant="h6" variant="h6" component="div" sx={{ flexGrow: 1 }} component="div">
            Restaurant Application          
          </Typography>
          <div>
           { props.loggedIn ? <Button className="logoutBtn" onClick={() => props.onLoggedIn(false)}>Logout</Button> : <Link to='/login'>Login/SignUp</Link> }
           </div>
        </Toolbar>
      </AppBar>
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
            <ListItem button >
              <Link to="/" className='link'>Account</Link>
            </ListItem>
            <ListItem button >
              <Link to="/" className='link'>Settings</Link>
            </ListItem>
              <ListItem>
                
              </ListItem>
          </List>
          <Divider />
         
        </Box>
      </Drawer>  
     
      </>
  );
}

export default SideBar




