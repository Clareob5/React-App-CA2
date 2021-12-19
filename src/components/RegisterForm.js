import { useState } from 'react'
import axios from '../config/index'
import { Grid, Paper, Avatar, Typography, Button, CardMedia } from '@mui/material/'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MyTextField from './formFields/Input'



const RegisterForm = (props, validateOnChange = false) => {
  const [form, setForm] = useState({ name: "", password: "", role: "customer" })
  const [errors, setErrors] = useState({})
  let navigate = useNavigate()

  const validate = (formValues = form) => {
    let temp = { ...errors }
    if ('name' in formValues)
      temp.name = formValues.name.length > 3 ? "" : "This field must have at least 3 letters."
    if ('email' in formValues)
      temp.email = (/.+@.+..+/).test(formValues.email) ? "" : "Email is not valid."
    if ('password' in formValues)
      temp.password = formValues.password.length > 7 ? "" : "Minimum 8 characters required."
    setErrors({
      ...temp
    })
  }

  const handleForm = e => {
    setForm(form => ({
      ...form,
      [e.target.name]: e.target.value
    }))
    if (validateOnChange)
      validate({ [e.target.name]: e.target.value })
    console.log(form)
  }

  const submitForm = () => {
    console.log(form)

    axios.post('/users/register', form)
      .then(response => {
        console.log(response.data)
        props.onLoggedIn(true, response.data.auth_token)
        localStorage.setItem('user', response.data.info.id)
        navigate('/account')
      })
      .catch(err => {
        console.log(`Error: ${err}`)
        console.log(err.response)
        setErrors(err.response.data)
      })
  }
  const paperStyle = { padding: 20, margin: "0 auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#FF7982' }
  const btnstyle = { margin: '8px 0', background: '#c74402' }
 
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={6} >
          <CardMedia
            component="img"
            height="500"
            image="../img/register.jpg"
            alt="Restaurant"
          />
        </Grid>
        <Grid align='center' item xs={6}>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography 
            variant='caption' 
            gutterBottom>Please fill this form to create an account !
          </Typography>
      
          <MyTextField 
            label='Name'
            name="name" 
            onChange={handleForm} 
            error={errors.name}
           />
      
          <MyTextField 
            label='Email' 
            name="email" 
            onChange={handleForm} 
            error={errors.email} 
          />
      
          <MyTextField
          type="password"
            name="password"
            label="Password"           
            onChange={handleForm}
            error={errors.password}
          />
        <FormControlLabel
          control={<Checkbox name="checkedA" />}
          label="I accept the terms and conditions."
        />
        <Button type='submit' variant='contained' onClick={submitForm} style={btnstyle} fullWidth>Sign up</Button>
        </Grid>
      </Grid>
    </Paper>
  )

}

export default RegisterForm;