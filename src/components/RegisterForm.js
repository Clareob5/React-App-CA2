import { useState } from 'react'
import axios from '../config/index'
import { Grid, Paper, Avatar, Typography, TextField, Button, CardMedia } from '@mui/material/'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const RegisterForm = (props) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" })


  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(form)
  }

  const submitForm = () => {
    console.log(form)

    axios.post('/users/register', form)
      .then(response => {
        console.log(response.data)
        window.location = "/"
        props.onLoggedIn(true, response.data.auth_token)
        //setLoggedIn(true)
      })
      .catch(err => console.log(`Error: ${err.response.data.errors}`))
  }
  const paperStyle = { padding: 20, margin: "0 auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#FF7982' }
  const btnstyle = { margin: '8px 0', background: '#c74402' }
  const marginTop = { marginTop: 5 }
  const textFieldStyle = { margin: '8px 0' }
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
          <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
      
        <TextField fullWidth style={textFieldStyle} label='Name' name="name" onChange={handleForm} placeholder="Enter your name" />
        <TextField fullWidth style={textFieldStyle} label='Email' name="email" onChange={handleForm} placeholder="Enter your email" />
        <TextField fullWidth style={textFieldStyle} type="password" label='Password' name="password" onChange={handleForm} placeholder="Enter your password" />
        {/* <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/> */}
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