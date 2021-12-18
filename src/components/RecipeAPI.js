import axios from "axios";
import { useEffect, useState } from 'react'
import { Button, Paper, Card, CardContent, Typography, Grid, CardMedia, Container } from '@mui/material';


const RecipeAPI = () => {

    const [imageUrl, setImageUrl] = useState("");
    const [recipes, setRecipes] = useState([])
    let array = []

    useEffect(() => {
        if(recipes.length <= 0){
        axios.get(
            `https://api.spoonacular.com/recipes/658007/similar?apiKey=b33eb760c65d46d382a922416da7192a&number=4`, {
            headers: {
            'Access-Control-Allow-Origin': '*',
        }}
        )
        .then(response => {
            console.log(response.data)
            setRecipes(response.data)
            setImageUrl(response.data.image);
        })
            .catch(err => {
                console.log(`Error: ${err}`)
         })
        }else{
            console.log('recipes is full')
        }
    }, [recipes])


    const recipeList = recipes.map(recipes => {
        return ( 
            <Grid item xs={3} key={recipes.id}>
                <Card>
                <CardContent sx={{ minHeight: 275 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            {recipes.title}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
           
        )
    })

    return (
      <>   
          {recipeList}
      </>
    )
}


export default RecipeAPI