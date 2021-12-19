import { Container, Grid, CardMedia } from '@mui/material';
import EditRestaurant from '../../components/restaurants/Edit'

const Edit = () => {
  
  return (
    <Container className="App">
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} >
          <CardMedia
            component="img"
            height="200"
            width="700"
            image="../../img/restaurant3.jpg"
            alt="Restaurant"
          />
        </Grid>
        <EditRestaurant />
        </Grid>
       
    </Container>
  )
}

export default Edit

