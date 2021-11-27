import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Show = () => {
    let { id } = useParams()
    const [restaurant, setRestaurant] =  useState(null)

    // let token = localStorage.getItem('token')

     useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurants/${id}`)
             .then(response => {
                 console.log(response.data)
                 setRestaurant(response.data.restaurant)
             })
             .catch(err => {
                 console.log(`Error: ${err}`)
             })
    },[id])

    if(!restaurant) return null
  
  return (
    <div>
      <h2>Show restaurant page: {id}</h2>

      <p><b>Title: </b> {restaurant.name}</p>
      <p><b>Address: </b> {restaurant.address.building}, {restaurant.address.zipcode}, {restaurant.address.street} </p>
      <p><b>Borough: </b> {restaurant.borough} </p>
      <p><b>Cuisine: </b> {restaurant.cuisine}</p>
    </div>
  )
}

export default Show

    // axios.get(`http://localhost:8000/api/restaurants/${id}`, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //        }
    //     })