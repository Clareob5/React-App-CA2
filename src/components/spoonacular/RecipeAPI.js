import axios from "axios";
import { useEffect, useState } from 'react'
import RecipeInfo from './RecipeInfo'


const RecipeAPI = props => {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        //withCredentials: false, - solving cors issue 
        //recipes wouldnt load because of cors
        if(recipes.length <= 0){
        axios.get(
            `https://api.spoonacular.com/recipes/658007/similar?apiKey=1eeb745d38994dc294c596bcf5e4cefc&number=${props.numRecipes}`, 
            {
                withCredentials: false
            }, {
            headers: {
                    'Access-Control-Allow-Origin': '*',
        }}
        )
        .then(response => {
            console.log(response.data)
            setRecipes(response.data)
        })
            .catch(err => {
                console.log(`Error: ${err}`)
         })
        }else{
            console.log('recipes is full')
        }
    }, [recipes])

    //returns all the recipes according to recipe info component
    return (
      <>
        {recipes.map((recipe) => {
            return <RecipeInfo key={recipe.id} recipe={recipe} />;
             })}
        </>
    )
}


export default RecipeAPI