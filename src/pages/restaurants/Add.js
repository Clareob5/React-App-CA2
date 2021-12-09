import axios from '../../config/index.js'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { Grid, Paper, Avatar, Typography, TextField, Button, Box, Container} from '@mui/material/'

const Add = props => {

  const [form, setForm] = useState(null)

  let token = localStorage.getItem('token')
  let navigate = useNavigate()

  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    console.log(form)
  }

const submitForm = () => {
  console.log(form)
  console.log(token)

        axios.post(`/restaurants`,{
         address: {
      building: form.building,
      coord: [ form.coord1,form.coord2  ],
      street: form.street,
      zipcode: form.zipcode
    },
    borough: form.borough,
    cuisine: form.cuisine,
    grades: [
      {
        date: form.date,
        grade: form.grade,
        score: form.score
      }  
    ],
    name: form.name,
    restaurant_id: form.restaurant_id
      }, {
             headers: {
                 "Authorization": `Bearer ${token}`
             }
            
        })
        .then(response => {
                 console.log(response.data)
                 navigate(`/restaurants/${response.data.restaurant._id}`, {replace: true})
             })
             .catch(err => {
                 console.log(`Error: ${err}`)
             })
            }

      const textFieldStyle={margin:'8px auto'}
  
  return (
    <Container  className="App">
    <Grid>
      <h2>Add Restaurant</h2>

    
      <Grid container spacing={1}>
      <h4>Address</h4>
      <TextField fullWidth style={textFieldStyle} label='Building' name="building" onChange={handleForm} placeholder="Enter Building number" />
      <TextField style={textFieldStyle} type= 'number' label='Co-ord' name="coord1" onChange={handleForm} placeholder="Enter first coordinate" />
      <TextField style={textFieldStyle} type= 'number' label='Co-ord' name="coord2" onChange={handleForm} placeholder="Enter second coordinate" />
      <TextField fullWidth style={textFieldStyle} type= 'street' label='Street' name="street" onChange={handleForm} placeholder="Enter street name" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Zipcode' name="zipcode" onChange={handleForm} placeholder="Enter Zipcode" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Borough' name="borough" onChange={handleForm} placeholder="Enter Borough" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Cuisine' name="cuisine" onChange={handleForm} placeholder="Cuisine" />
      <h4>Grade</h4>
      <TextField fullWidth style={textFieldStyle} type= 'date' label='Date' name="date" onChange={handleForm} />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Grade' name="grade" onChange={handleForm} placeholder="A-Z" />
      <TextField fullWidth style={textFieldStyle} type= 'number' label='Score' name="score" onChange={handleForm} placeholder="Score" />
      <TextField fullWidth style={textFieldStyle} type= 'text' label='Name' name="name" onChange={handleForm} placeholder="Name" />
      <TextField fullWidth style={textFieldStyle} type= 'number' label='Restaurant ID' name="restaurant_id" onChange={handleForm} placeholder="Restaurant id" />
      
 </Grid>
      <Button onClick={submitForm}> Submit</Button>
    </Grid>
    </Container>
  )
}

export default Add