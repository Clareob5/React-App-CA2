import axios from '../config';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const GradesList = () => {

  let { id } = useParams()
  const [grades, setGrades] = useState([])
  let token = localStorage.getItem('token')



  useEffect(() => {
    axios.get(`/restaurants/${id}`)
      .then(response => {
        console.log(response.data.restaurant.grades)
        setGrades(response.data.restaurant.grades)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id])

  if (!grades) return null


  const gradesList = grades.map(grades => {
    return (

      <Grid item xs={3} key={grades._id}>
      
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Restaurant Rating
            </Typography>
            <Typography variant="h5" component="div">
              Grade: {grades.grade}
            </Typography>
            <Typography variant="body2">
              Score: {grades.score}
            </Typography>
            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
              {grades.date}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  })


  return (<>   
  { gradesList } </>)
}

export default GradesList