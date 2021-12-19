import { Card, CardContent, Typography, Grid, CardMedia} from '@mui/material';
import moment from 'moment'

const GradesList = props => {

  const gradesList = props.restaurant.grades.map(grades => {
    return (

      <Grid item xs={3} key={grades._id}>      
        <Card sx={{ minWidth: 200, border: 1, borderColor: 'grey.500', margin: 1}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Restaurant Rating
            </Typography>
            <CardMedia
              component="img"
              height="100"
              image="../img/feedback.jpg"
              alt="Restaurant"
            />
            <Typography variant="h5" component="div">
              Grade: {grades.grade}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Score: {grades.score}
            </Typography>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {moment(grades.date).format("yy-MM-DD")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  })


  return (
  <>   
  { gradesList } 
  </>
  )
}

export default GradesList