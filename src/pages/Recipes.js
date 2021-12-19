import { Container, Grid, Typography, Box, CardMedia} from '@mui/material'
import Recipe from '../components/spoonacular/RecipeAPI'



const Recipes = props => {

      return (
        <Container className="bigMarginTop">
            <Box>
                <Typography sx={{ fontSize: 28, fontWeight: 500, textAlign: 'center'}} >
                    Recipes
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 300, textAlign: 'center' }} color="text.secondary">
                    Browse and visit the websites of these amazing recipes
                </Typography>
                <CardMedia component="img"
                    height="300"
                    image='./img/recipe.png'
                    alt="Restaurant"></CardMedia>
                <div className="marginTop">
                <Grid container spacing={2} columns={12} >
                        {/* <Recipe numRecipes={12} /> */}
                </Grid>
                </div>
            </Box>
        </Container>

    )
}

export default Recipes