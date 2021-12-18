import axios from '../../config/index'
import { useEffect, useState, Fragment } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Paper, Card, CardContent, Typography, Grid, CardMedia, Container } from '@mui/material';
import GradesList from '../../components/GradesList'

const Show = () => {
  let { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [grades, setGrades] = useState([])
  let navigate = useNavigate()

  let token = localStorage.getItem('token')



  useEffect(() => {
    axios.get(`/restaurants/${id}`)
      .then(response => {
        console.log(response.data)
        setRestaurant(response.data.restaurant)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id])

  if (!restaurant) return null

  const onDelete = (id) => {
    axios.delete(`/restaurants/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate("/restaurants")
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }

  // const gradesList = grades.map(grades => {
  //   return (

  //     <Grid item xs={6} key={grades._id}>
  //       <Card sx={{ minWidth: 275 }}>
  //         <CardContent>
  //           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
  //             Restaurant Rating
  //           </Typography>
  //           <Typography variant="h5" component="div">
  //             Grade: {grades.grade}
  //           </Typography>
  //           <Typography variant="body2">
  //             Score: {grades.score}
  //           </Typography>
  //           <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
  //             {grades.date}
  //           </Typography>
  //         </CardContent>
  //       </Card>
  //     </Grid>

  //   )
  // })



  return (
    <Container className="marginTop">
      <Paper variant="outlined">
        <Typography sx={{ fontSize: 28, fontWeight: 500 }}>
          Restaurant Info
        </Typography>
        <Grid container spacing={2} columns={12} >
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>
              <b>Title: </b> {restaurant.name}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Address:
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Building Number:  {restaurant.address.building}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Street:  {restaurant.address.street}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Zipcode: {restaurant.address.zipcode}
            </Typography>
            <Typography>
              Borough:  {restaurant.borough}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Cuisine:  {restaurant.cuisine}
            </Typography>
            <Link to='edit'>Edit</Link>
            <Button onClick={() => onDelete(restaurant._id)}>Delete</Button>
          </Grid>
          <Grid item xs={6} >
            <CardMedia
              component="img"
              height="500"
              image="../img/restaurantImg.jpg"
              alt="Restaurant"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 28, fontWeight: 500 }}>
              Grades
            </Typography>
          </Grid>
          <GradesList />
        </Grid>
      </Paper>
    </Container>
  )
}

export default Show

    // axios.get(`http://localhost:8000/api/restaurants/${id}`, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //        }
    //     })