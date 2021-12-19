import axios from '../../config/index'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Paper, Typography, Grid, CardMedia, Container } from '@mui/material';
import GradesList from '../../components/restaurants/GradesList'
import DialogDelete from '../../components/restaurants/DialogDelete'

const Show = () => {
  let { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [open, setOpen] = useState(false);
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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const info = { fontSize: 16, fontWeight: 300, margin: 1}
  const subheading = { fontSize: 20, fontWeight: 600, margin: 1, marginTop: 2, marginBottom: 2 }
  const heading = { fontSize: 28, fontWeight: 600, margin: 1, paddingBottom: 2 }

  return (
    <Container className="bigMarginTop">
      <Paper variant="outlined">
        <Grid container spacing={2} columns={12} >
          <Grid item xs={6}>
            <Typography sx={heading}>
              Restaurant Info
            </Typography>
            <Typography sx={info}>
              <b>Title: </b> {restaurant.name}
            </Typography>
            <Typography sx={info}>
              <b>Cuisine:</b>  {restaurant.cuisine}
            </Typography>
            <Typography sx={subheading}>
              Address
            </Typography>
            <Typography sx={info}>
              <b>Building Number:</b>   {restaurant.address.building}
            </Typography>
            <Typography sx={info}>
              <b>Street:</b>   {restaurant.address.street}
            </Typography>
            <Typography sx={info}>
              <b>Zipcode:</b>  {restaurant.address.zipcode}
            </Typography>
            <Typography sx={info}>
              <b>Borough:</b>  {restaurant.borough}
            </Typography>
            <Link to='/restaurants' className='backbtn'>Cancel</Link>
            <Link to='edit' className='editbtn'>Edit</Link>
            {/* <Link to='edit' className='editbtn'>Edit</Link> */}
            <Button className="deletebtn" onClick={handleClickOpen}>Delete</Button>
            <DialogDelete id={id} open={open} setOpen={setOpen}/>
          </Grid>
          <Grid item xs={6} >
            <CardMedia
              component="img"
              height="500"
              image="../img/restaurantImg.jpg"
              alt="Restaurant"
            />
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: 26, fontWeight: 200, marginLeft: 1, borderBottom: 1, borderColor: 'grey.300' }}>
          Grades
        </Typography>
        <Grid container spacing={2} columns={12}>
          <GradesList restaurant={restaurant} setRestaurant={setRestaurant} />
        </Grid>
      </Paper>
    </Container>
  )
}

export default Show
