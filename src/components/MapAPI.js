import axios from '../config/index.js'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react'

const MapAPI = () => {

    const [restaurants, setRestaurants] = useState(null)
    let token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/restaurants/coords')
            .then(response => {
                console.log(response.data.restaurants)
                setRestaurants(response.data.restaurants)
                console.log(restaurants)

            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    },[token])

    if (!restaurants) return <>Loading</>


    const containerStyle = {
        width: '70vw',
        height: '400px'
    };

    const center = {
        lat: 40.7685235,
        lng: -73.96926909999999
    };

    const markers  = restaurants.map(restaurant => {
        console.log()
        return (
            <Marker
                position={{
                    lat: restaurant.address.coord[1],
                    lng: restaurant.address.coord[0]
                }}
            />
        )
    })

    const position = {
        lat: 37.772,
        lng: -122.214
    }

    // const onLoad = marker => {
    //     console.log('marker: ', marker)
    // }


    return (
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
    )
}

export default MapAPI;