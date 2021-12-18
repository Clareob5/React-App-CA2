import axios from '../../config/index'
import {  useState,useContext, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Paper, Typography, Grid, CardMedia, Container } from '@mui/material';
import {UserContext} from '../../UserContext'

const Account = props => {
  const {user, setUser} = useContext(UserContext);
  let id = user._id
  let navigate = useNavigate()

  let token = localStorage.getItem('token')
  console.log(user)

  useEffect(() => {
    axios.get(`users/${id}`)
      .then(response => {
        console.log(response.data)
        setUser(response.data)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id])

  if (!user) return null

  const onDelete = (id) => {
    axios.delete(`/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate("/")
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }

    return (
      <Container className="marginTop">


        <Paper variant="outlined">
          <Typography sx={{ fontSize: 28, fontWeight: 500 }}>
            Account Info
          </Typography>
          <Grid container spacing={2} columns={12} >
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 14 }}>
                <b>Name: </b> {user.name}
              </Typography>
              <Link to='edit'>Edit</Link>
              <Button onClick={() => onDelete(user._id)}>Delete</Button>
            </Grid>
            <Grid item xs={6} >
              <CardMedia
                component="img"
                height="500"
                image="../img/restaurantImg.jpg"
                alt="Restaurant"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
}

export default Account

   