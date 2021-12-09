import {CardMedia, Grid} from '@mui/material'
import { Link } from 'react-router-dom'
const Banner = props => {

  return (
    <>
      <Grid container spacing={2} columns={12} >
      <Grid item xs={5}> {!props.loggedIn ? <Link to='/register'>Create an Account</Link> : "You are Logged In"} </Grid>
      <Grid item xs={7}><CardMedia component="img"
        height="500"
        image="../img/bannerImg.jpeg"
        alt="Restaurant"></CardMedia>
        </Grid>
        </Grid>
        </>
      
    
  )
}

export default Banner