import axios from '../../config/index.js'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react'
import { Typography, Box, CircularProgress} from '@mui/material';

const MapAPI = () => {

    //state for restaurants
    const [restaurants, setRestaurants] = useState(null)
    //adds token to local storage
    let token = localStorage.getItem('token')

    //get the restaurants
    //this only returns 100 restuarants as loading all coordinates on the map was very computationally heavy
    useEffect(() => {
        axios.get('/restaurants/coords')
            .then(response => {
                console.log(response.data.restaurants)
                setRestaurants(response.data.restaurants) //sets restaurants
                console.log(restaurants)

            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    },[token])

    if (!restaurants) return <><CircularProgress className="loading"/></>


    const containerStyle = {
        mx: 'auto',
        alignContent: 'center',
        width: '60vw',
        height: '400px'
    };

    //this is the center where the map will appear
    //ive it set to New York as thats where all the restaurants are
    const center = {
        lat: 40.7685235,
        lng: -73.96926909999999
    };

    //creates a marker with each of the coordinates
    const markers  = restaurants.map(restaurant => {
        return (
            <Marker
                key={restaurant._id}
                position={{
                    lat: restaurant.address.coord[1],
                    lng: restaurant.address.coord[0]
                }}
            />
        )
    })

    const paperStyle = { borderRadius: 0, elevation: 0, padding: 50 }
    return (
        <Box style={paperStyle} >
        <Typography sx={{ marginBottom: 3, fontSize: 20, fontWeight: 400, textAlign: 'center' }}>Our Restaurant Locations</Typography>
        <Typography sx={{ marginBottom: 3, fontSize: 16, fontWeight: 300, textAlign: 'center' }}>Currently our Restaurants are all in the Manhattan area</Typography>
        <hr />
        {/* this loads the map and uses my key to access it */}
        <LoadScript
            googleMapsApiKey="AIzaSyAWDEfq4LYLCiAhTlNK2try2Vg8JG2ptc8"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
            >
                <Marker
                    position={center}
                />
               {markers}
                <></>
            </GoogleMap>
        </LoadScript>
        </Box>
    )
}

export default MapAPI;