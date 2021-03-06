import { useState, useContext } from 'react'
import axios from '../config/index'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

import { Grid, Paper, Avatar, Button, CardMedia, FormControlLabel, Checkbox} from "@mui/material/"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MyTextField from './formFields/Input'



const LoginForm = (props, validateOnChange = false) => {

  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({}) //errors stae for both reatc and mongoose errors
  const { user, setUser } = useContext(UserContext)

  let navigate = useNavigate()
  
  //validating the form fields
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

  //adding the data into the form
  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    //validating the form as data is inputted
    if (validateOnChange)
      validate({ [e.target.name]: e.target.value })
    console.log(form)
  }

  //submitting the data to the database
  const submitForm = () => {

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

  //making styles to use within the form
  const paperStyle = { padding: 20, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#FF7982' }
  const btnstyle = { margin: '8px 0', background: '#c74402' }
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2} columns={12}>
        <Grid align='center' item xs={6}>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
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






