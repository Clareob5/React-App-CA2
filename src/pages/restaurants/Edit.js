import { useState, useEffect } from 'react'
import axios from '../../config/index'
import { TextField, FormControl, Select, Button, Container, Grid} from '@mui/material'
import { useNavigate, useParams, Link} from 'react-router-dom'

//import { AdapterMoment, LocalizationProvider,  DateTimePicker} from '@mui/lab'

const Edit = props => {

  const [form, setForm] = useState()
  let { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)

  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  
   

    useEffect(() => {
        console.log({id})
        axios.get(`restaurants/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
             .then(response => {
                console.log(response.data)
                setRestaurant(response.data.restaurant)
                setForm(response.data)
             })
             .catch(err => {
                console.log(`Error: ${err}`)
             })
    }, [id, token])

    if(!restaurant) return null
    const textFieldStyle={margin:'8px auto'}

    const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    axios.put(`restaurants/${id}`,form, {
         headers: {
                "Authorization": `Bearer ${token}`
            }
    })
        .then(response => {
          console.log(response.data)
          navigate(`/restaurants/${response.data._id}`, {replace: true})
        })
        .catch(err => console.log(err))
  }

  return (
       <Container  className="App">
    <Grid>
      <h2>Edit Restaurant</h2>

    
      <Grid container spacing={1}>
      <h4>Address</h4>
      <TextField fullWidth style={textFieldStyle} label='Building' name="building" value={restaurant.address.building} onChange={handleForm} placeholder="Enter Building number" />
      <TextField style={textFieldStyle} type= 'number' label='Co-ord' name="coord1" value={restaurant.address.coord} onChange={handleForm} placeholder="Enter first coordinate" />
      <TextField style={textFieldStyle} type= 'number' label='Co-ord' name="coord2" onChange={handleForm} placeholder="Enter second coordinate" />
      <TextField fullWidth style={textFieldStyle} type= 'street' label='Street' name="street" value={restaurant.address.street} onChange={handleForm} placeholder="Enter street name" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Zipcode' name="zipcode" value={restaurant.address.zipcode} onChange={handleForm} placeholder="Enter Zipcode" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Borough' name="borough" value={restaurant.borough} onChange={handleForm} placeholder="Enter Borough" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Cuisine' name="cuisine" value={restaurant.cuisine} onChange={handleForm} placeholder="Cuisine" />
      <h4>Grade</h4>
      <TextField fullWidth style={textFieldStyle} type= 'date' label='Date' name="date" value={restaurant.grades.date} onChange={handleForm} />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Grade' name="grade" value={restaurant.grades.grade} onChange={handleForm} placeholder="A-Z" />
      <TextField fullWidth style={textFieldStyle} type= 'number' label='Score' name="score" value={restaurant.grades.score} onChange={handleForm} placeholder="Score" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Name' name="name" value={restaurant.name} onChange={handleForm} placeholder="Name" />
      <TextField fullWidth style={textFieldStyle} type= 'number' label='Restaurant ID' name="restaurant_id" value={restaurant.restaurant_id} onChange={handleForm} placeholder="Restaurant id" />
      
 </Grid>
      <Button onClick={submitForm}> Submit</Button>
    </Grid>
    </Container>

     
  )
}


export default Edit