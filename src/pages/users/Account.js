import axios from '../../config/index'
import { useState, useEffect } from 'react'
import { Paper, Typography, Grid, CardMedia, Container } from '@mui/material';
import UsersTable from '../../components/UsersTable'
//previously used use context here but it didnt work as needed
//import {UserContext} from '../../UserContext'

const Account = props => {
  //const {user, setUser} = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});

  let id = localStorage.getItem('user')

  //getting the user 
  useEffect(() => {
    axios.get(`users/${id}`)
      .then(response => {
        console.log(response.data)
        setCurrentUser(response.data.user)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id])

  if (!currentUser) return null

  const info = { fontSize: 16, fontWeight: 300, margin: 1 }
  const heading = { fontSize: 28, fontWeight: 600, margin: 1, paddingBottom: 2 }

  return (
    <Container className="bigMarginTop">

      <Paper variant="outlined">
        {!currentUser ? <>Loading..</> :
          <Grid container spacing={2} columns={12} >
            <Grid item xs={6}>
              <Typography sx={heading}>
                Account Info
              </Typography>
              <Typography sx={info}>
                <b>Name: </b> {currentUser.name}
              </Typography>
              <Typography sx={info}>
                <b>Email: </b> {currentUser.email}
              </Typography>
              <Typography sx={info}>
                <b>Role: </b> {currentUser.role}
              </Typography>
            </Grid>
            <Grid item xs={6} >
              <CardMedia
                component="img"
                height="300"
                image="../../img/accountimg.jpg"
                alt="Restaurant"
              />
            </Grid>
          </Grid>
        }
      </Paper>
      {currentUser.role === 'admin' ? <UsersTable /> : " "
      }
    </Container>
  )
}

export default Account

