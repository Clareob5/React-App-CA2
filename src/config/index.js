import axios from 'axios'

export default axios.create({
    baseURL: "https://cob-restaurant-api.herokuapp.com/api/"
})