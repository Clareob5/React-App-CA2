import { useState } from 'react'
import { Paper, Tabs, Tab, Typography, Box} from '@mui/material';
import Login from '../components/LoginForm'
import Signup from '../components/RegisterForm' 

const SignUpSignIn=(props)=>{

const [value,setValue]=useState(0)
const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle={width:800,margin:"100px auto"}
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
    return (
        <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Sign In" />
         
          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
      <Login handleChange={handleChange} onLoggedIn={props.onLoggedIn}/> 
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Signup onLoggedIn={props.onLoggedIn}/>
      </TabPanel>
      </Paper>
      
    )
}

export default SignUpSignIn;