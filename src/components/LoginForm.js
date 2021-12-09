import { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

import { Grid,Paper, Avatar, TextField, Button, CardMedia } from "@mui/material/"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const LoginForm=(props,{handleChange})=>{

    const [form, setForm] = useState({email: "clare@mail.com", password: "password"})
    let navigate = useNavigate()
 

  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    console.log(form)
  }

const submitForm = () => {
  console.log(form)

  axios.post('http://localhost:8000/api/users/login', {
    email: form.email,
    password: form.password
  })
  .then(response => {
    //console.log(response.data)
    props.onLoggedIn(true, response.data.auth_token)
     navigate('/')
    //setLoggedIn(true)
  })
  .catch(err => console.log(`Error: ${err}`))
}

    const paperStyle={padding:20, margin:"0 auto"}
  const avatarStyle = { backgroundColor:'#FF7982'}
  const btnstyle = { margin: '8px 0', background: '#c74402' }
    const textFieldStyle={margin:'8px 0'}
    return(
      <Paper style={paperStyle}>
      <Grid container spacing={2} columns={12}>        
          <Grid align='center' item xs={6}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                
                <TextField
                style={textFieldStyle}  
                onChange={handleForm} 
                name="email"
                label={"Email"}  
                fullWidth required
                />
                <TextField  
                 style={textFieldStyle}
                name="password" 
                onChange={handleForm} 
                label="Password"
                type="password" 
                fullWidth required
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' variant="contained" onClick={submitForm} style={btnstyle} fullWidth>Sign in</Button>
          </Grid>
          <Grid item xs={6} >
            <CardMedia
              component="img"
              height="500"
              image="../img/register.jpg"
              alt="Restaurant"
            />
          </Grid>
          </Grid>
        </Paper>
        
    )
}

export default LoginForm






