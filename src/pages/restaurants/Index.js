import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8000/api/restaurants/')
             .then(response => {
                 console.log(response.data)
                 setRestaurants(response.data.restaurants)
             })
             .catch(err => {
                 console.log(`Error: ${err}`)
             })
    }, [])

    if(!restaurants) return null

    const restaurantsList = restaurants.map(restaurant => {
        return (
            <div key={restaurant._id}>
                
                <p><b>Title: </b> <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link> </p>
                <p><b>Address: </b> {restaurant.address.street} </p>
                <hr />
            </div>
            
        )
    })
  
    return (
      <div>
        <h2>Restaurants</h2>
        <p>This is the Restaurants Index page</p>
        <p><Link to="/restaurants/add">Add Restaurant</Link></p>
        { restaurantsList }
      </div>
    )
  }
  
  export default Index