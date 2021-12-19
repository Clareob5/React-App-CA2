import { Container, Grid, Typography, Box} from '@mui/material';
import Banner from '../components/homepage/Banner'
import Recipe from '../components/spoonacular/RecipeAPI'
import Map from '../components/homepage/MapAPI'




const Home = (props) => {

  return (
    <Container className="marginTop">
      <Banner loggedIn={props.loggedIn} />
        <Map /> 
      <Box>
        <Typography sx={{ fontSize: 22, fontWeight: 400, textAlign: 'center'  }} >
         Recipes
       </Typography>
        <hr />
       <Grid container spacing={2} columns={12} >
        {/* <Recipe numRecipes={4}/> */}
       </Grid>
      </Box> 
    </Container>
  )
}

export default Home