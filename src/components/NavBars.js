//import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Box, CssBaseline, ListItem, Drawer, Toolbar, List, Divider } from '@mui/material'
import TopNav from './TopNav'
//import { UserContext } from '../UserContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const SideBar = (props) => {
  //const { user } = useContext(UserContext);
  const drawerWidth = 240;

  return (
    <>
      <CssBaseline />
      <TopNav loggedIn={props.loggedIn} onLoggedIn={props.onLoggedIn} />
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
              <HomeIcon sx={{ margin: 1, color: '#fff' }} />
              <Link to="/" className='link'>Home</Link>
            </ListItem>
            <ListItem button >
              <MenuBookIcon sx={{ margin: 1, color: '#fff' }} />
              <Link to="/recipes" className='link'>Recipes</Link>
            </ListItem>

            {props.loggedIn ?
              <>
                <ListItem button >
                  <RestaurantIcon sx={{ margin: 1, color: '#fff' }} />
                  <Link to="/restaurants" className='link'>Restaurants</Link>
                </ListItem>
                <ListItem button >
                  <PersonOutlineIcon sx={{ margin: 1, color: '#fff' }} />
                  <Link to="/account" className='link' >Account</Link>
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




