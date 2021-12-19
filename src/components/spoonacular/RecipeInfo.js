import axios from "axios";
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Grid, Box, Link } from '@mui/material';


const RecipeInfo = props => {

    const [imageUrl, setImageUrl] = useState("");
    const [recipeInfo, setRecipeInfo] = useState();

    useEffect(() => {
        console.log(props.recipe.id)
        //withCredentials: false, - solving cors issue 
        //gets info from spoonacular using my APIKey and props
        axios.get(
            `https://api.spoonacular.com/recipes/${props.recipe.id}/information?apiKey=1eeb745d38994dc294c596bcf5e4cefc&`, { withCredentials: false }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        )
            .then(response => {
                console.log(response.data)
                setRecipeInfo(response.data)
                setImageUrl(response.data.image)
                console.log(imageUrl)
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    }, [])

    //styling the button to change on hover
    const btnstyle = {
        margin: '8px 0', color: '#c74402', '&:hover': {
            color: '#aa3b04',
            borderBottom: 1,
            borderCOlor: '#aa3b04'
        },
    }

    //returns recipe info
    return (
        <Grid item xs={3}>
            {!recipeInfo ? <div>Loading</div> :
                <Card sx={{ minWidth: 200, minHeight: 340, border: 1, borderColor: 'grey.300', margin: 1 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {recipeInfo.sourceName}
                        </Typography>

                        <CardMedia component="img"
                            height="170"
                            image={imageUrl}
                            alt="Restaurant"></CardMedia>
                        <Typography sx={{ fontSize: 16 }} color="text.primary">
                            {recipeInfo.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            Serves {recipeInfo.servings} people
                        </Typography>
                        <Box sx={{ mx: 'auto' }} >
                            {/* This is mui link not a react-router link */}
                            <Link underline="none" href={recipeInfo.sourceUrl} sx={btnstyle}>
                                Recipe Source
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            }
        </Grid>
    )
}


export default RecipeInfo