import { useState, useContext } from 'react'
import axios from '../config/index'
import { useNavigate} from 'react-router-dom'

import { Grid,Paper, Avatar, Button, CardMedia } from "@mui/material/"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MyTextField from './formFields/Input'
import { UserContext } from '../UserContext';


const LoginForm = (props, validateOnChange = false)=>{

    const [form, setForm] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({})
    const {user, setUser} = useContext(UserContext)

    let navigate = useNavigate()
   
  const validate = (formValues = form) => {
    let temp = { ...errors }
    if ('email' in formValues)
      temp.email = (/.+@.+..+/).test(formValues.email) ? "" : "Email is not valid."
    if ('password' in formValues)
      temp.password = formValues.password.length > 7 ? "" : "Minimum 8 characters required."
    setErrors({
      ...temp
    })
  }
  

  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    if (validateOnChange)
      validate({ [e.target.name]: e.target.value })
    console.log(form)
  }

const submitForm = () => {
  console.log(form)

  axios.post('/users/login', {
    email: form.email,
    password: form.password
  })
  .then(response => {
    props.onLoggedIn(true, response.data.auth_token)
    localStorage.setItem('user', response.data.info.id)
    setUser(response.data.info)
    console.log(user)
    navigate('/')
  })
  .catch(err => {
    console.log(`Error: ${err}`)
    console.log(err.response)
    setErrors(err.response.data)
  })
}

  const paperStyle={padding:20, margin:"0 auto"}
  const avatarStyle = { backgroundColor:'#FF7982'}
  const btnstyle = { margin: '8px 0', background: '#c74402' }
    return(
      <Paper style={paperStyle}>
      <Grid container spacing={2} columns={12}>        
          <Grid align='center' item xs={6}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                
                <MyTextField
                onChange={handleForm} 
                name="email"
                label="Email"
                error={errors.email} 
                required
                />
                <MyTextField  
                name="password" 
                onChange={handleForm} 
                label="Password"
                type="password"
                error={errors.password}
                 required
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






