import { Link } from 'react-router-dom'

import { Container, Grid, Typography} from '@mui/material';
import Banner from '../components/Banner'
import Recipe from '../components/RecipeAPI'



const Home = (props) => {

  return (
    <Container className="marginTop">
        <Banner />
      <Typography sx={{ fontSize: 20 }} color="text.secondary">
        Recipes
      </Typography>
         <Grid container spacing={2} columns={12} >
        <Recipe />
      </Grid>
      {/* { !props.loggedIn ? <LoginForm onLoggedIn={props.onLoggedIn} /> : "You are Logged In" }
      <hr /> */}
      {!props.loggedIn ? <Link to='/register'>Create an Account</Link> : "You are Logged In"}


    </Container>

  )
}

export default Home