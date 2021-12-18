import { useState, useEffect } from 'react'
import { Container, Grid, CardMedia } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import axios from '../../config';
import EditRestaurant from '../../components/Edit'

const Edit = (validateOnChange = false) => {


  let navigate = useNavigate()
  let { id } = useParams()
  let token = localStorage.getItem('token')

  const [form, setForm] = useState({})
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  const validate = (formValues = form) => {
    let temp = { ...errors }
    if ('building' in formValues)
      temp.building = formValues.building.length > 2 ? "" : "This field must have at least 3 numbers."
    if ('coord' in formValues){
      temp.coord = formValues.coord.indexOf(",") > -1 ? "" : "Coordinates must be separated by a comma."
      //temp.coord = (Number.isInteger(parseFloat(formValues.coord[0])) === true) ? "" : 'Both Coordinates Must be decimals'
      // temp.coord = (Number.isInteger(parseFloat(formValues.coord[1])) === true) ? "" : 'Both Coordinates Must be decimals'
    }
    if ('borough' in formValues)
      temp.borough = formValues.borough.length > 6 ? "" : "This field must have at least 7 letters."
    if ('restaurant_id' in formValues)
      temp.restaurant_id = formValues.restaurant_id.length === 8 ? "" : "This field must have 8 numbers."
    if ('zipcode' in formValues)
      temp.zipcode = formValues.zipcode.length === 5 ? "" : "This field must have 5 numbers."
    if ('street' in formValues)
      temp.street = formValues.street ? "" : "This field is required."
    if ('name' in formValues)
      temp.name = formValues.name ? "" : "This field is required."
    setErrors({
      ...temp
    })
  }


  useEffect(() => {
    axios.get(`/restaurants/${id}`)
      .then(response => {
        console.log(response.data.restaurant)
        console.log(response.data.restaurant.address.building)
        setRestaurant(response.data.restaurant)
        console.log(restaurant)
        setForm(response.data.restaurant)
        setLoading(false)
        
        console.log(form)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id])

  if (!restaurant) return null


  const handleForm = level => e => {

    if (!level) {
      // Assume root level
      setForm(prevState => ({
        ...prevState, //keeps track of previous state as changes happen
        [e.target.name]: e.target.value
      }))
    } else {
      setForm(prevState => ({
        ...prevState,
        [level]: {
          ...prevState[level],
          [e.target.name]: e.target.value
        }
      }))
    }
    if (validateOnChange)
         validate({ [e.target.name]: e.target.value })
    console.log(form)
  }



  const submitForm = () => {
    console.log(form)
    if (validate()) {
    //can just pass in form
    axios.put(`/restaurants/${id}`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.restaurant)
        navigate(`/restaurants/${id}`);

        //
        // setAuthenticated(true)
      })
      .catch(err => console.log(err))
  }else {
    console.log(errors)
  }
  }

  
  return (
    <Container className="App">
      <Grid container spacing={2} columns={12}>
        <Grid item xs={6}>
        <EditRestaurant />
        </Grid>
        <Grid item xs={6} >
          <CardMedia
            component="img"
            height="1000"
            image="../../img/restaurant3.jpg"
            alt="Restaurant"
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Edit

// import { useState, useEffect } from 'react'
        // import axios from '../../config/index'
        // import { Button, Container, Grid, CircularProgress, TextField } from '@mui/material'
        // import { useNavigate, useParams } from 'react-router-dom'
        // import MyTextField from '../../components/formFields/Input'
        // import SelectField from '../../components/formFields/Select'

        // //import { AdapterMoment, LocalizationProvider,  DateTimePicker} from '@mui/lab'

        // const Edit = (props, validateOnChange = false) => {

        //   let { id } = useParams()
        //   const [form, setForm] = useState({})
        //   const [restaurant, setRestaurant] = useState({})
        //   // const [gradesList, setGradesList] = useState([])
        //   // const [loading, setLoading] = useState(true)
        //   // const [errors, setErrors] = useState({})

        //   let navigate = useNavigate()
        //   let token = localStorage.getItem('token')

        //   // const validate = (formValues = form) => {
        //   //   let temp = { ...errors }
        //   //   if ('building' in formValues)
        //   //     temp.building = formValues.building.length > 3 ? "" : "This field must have at least 3 numbers."
        //   //   if ('coord1' in formValues)
        //   //     temp.coord1 = ('[+-] ?\d + (?: [.,]\d +)?').test(formValues.coord) ? "" : "is not valid."
        //   //   if ('borough' in formValues)
        //   //     temp.borough = formValues.borough ? "" : "This field is required."
        //   //   setErrors({
        //   //     ...temp
        //   //   })
        //   // }


        //   useEffect(() => {
        //     console.log('running')
        //     axios.get(`restaurants/${id}`, {
        //       headers: {
        //         "Authorization": `Bearer ${token}`
        //       }
        //     })
        //       .then(response => {
        //         console.log(response.data.restaurant)
        //         setRestaurant(response.data.restaurant)
        //         setForm(response.data.restaurant)
        //         console.log(form)
        //         //setLoading(false)

        //       })
        //       .catch(err => {
        //         console.log(`Error: ${err}`)
        //       })
        //   }, [id, token])

        //   // useEffect(() => {
        //   //   setForm({
        //   //     address: {
        //   //       building: restaurant.address.building,
        //   //       coord: [restaurant.address.coord],
        //   //       street: restaurant.address.street,
        //   //       zipcode: restaurant.address.zipcode
        //   //     },
        //   //     grades: gradesList,
        //   //     borough: restaurant.borough,
        //   //     cuisine: restaurant.cuisine,
        //   //     name: restaurant.name,
        //   //     restaurant_id: restaurant.restaurant_id
        //   //   })
        //   //   console.log(form)
        //   // }, [restaurant])

        //   if (!restaurant) return null

        //   const handleForm = e => {
        //     setForm(prevState => ({
        //       ...prevState,
        //       [e.target.name]: e.target.value
        //     }))
        //     // if (validateOnChange)
        //     //   validate({ [e.target.name]: e.target.value })
        //     // console.log(form)
        //   }

        //   const submitForm = () => {
        //     console.log(form)

        //     axios.put(`restaurants/${id}`, form, {
        //       headers: {
        //         "Authorization": `Bearer ${token}`
        //       }
        //     })
        //       .then(response => {
        //         console.log(response.data.restaurant)
        //         navigate(`/restaurants/${response.data._id}`)
        //       })
        //       .catch(err => console.log(err))
        //   }

        //   return (
        //     <Container className="App">
        //       <Grid>
        //         <h2>Edit Restaurant</h2>
        //           <Grid container spacing={1}>
        //             <h4>Address</h4>

        //             <TextField type="text" label='Building' name="building" value={form.address.building} onChange={handleForm} />
        //             <TextField type='number' label='Co-ord' name="coord" value={form.address.coord} onChange={handleForm} />
        //             <TextField type='text' label='Street' name="street" value={form.address.street} onChange={handleForm} />
        //             <TextField type='text' label='Zipcode' name="zipcode" value={form.address.zipcode} onChange={handleForm} />
        //             <TextField type='text' label='Borough' name="borough" value={form.borough} onChange={handleForm} />
        //             <SelectField label='Cuisine'
        //               name="cuisine"
        //               onChange={handleForm}
        //               // error={errors.cuisine}
        //               value={form.cuisine} />
        //             <TextField type='text' label='Name' name="name" value={form.name} onChange={handleForm} />
        //             <TextField type='number' label='Restaurant ID' name="restaurant_id" value={form.restaurant_id} onChange={handleForm} />

        //           </Grid>


        //         <Button onClick={submitForm}> Submit</Button>
        //       </Grid>
        //     </Container>


        //   )
        // }
        // <Container>

        //   <div class="header-text">
        //     <Typography variant="h2">Update Restaurant</Typography>
        //    </div>

        //    <div class="short-top">
        //      <img src="https://cdn.dribbble.com/users/2008861/screenshots/15229706/media/b60d6e61e33e46d933dc33361cfddb41.gif?compress=1&resize=1150x350"></img>

        //   </div>
        //    <div className="form-group form-top">
        //      <TextField label="Name" fullWidth sx={{ s: 1 }} variant="standard" name="name" onChange={handleForm} value={form.name} InputLabelProps={{ shrink: true, }} /> <br />
        //    </div>

        //    <div className="form-group form-top">
        //      <TextField label="Borough" fullWidth sx={{ s: 1 }} variant="standard" name="borough" onChange={handleForm} value={form.borough} InputLabelProps={{ shrink: true, }} /> <br />
        //    </div>

        //    <div className="form-group form-top">
        //      <TextField label="Cuisine" fullWidth sx={{ s: 1 }} variant="standard" name="cuisine" onChange={handleForm} value={form.cuisine} InputLabelProps={{ shrink: true, }} /> <br />
        //   </div>

        //   <div className="form-group form-top">
        //     <TextField label="RestaurantID" fullWidth sx={{ s: 1 }} variant="standard" name="restaurant_id" onChange={handleForm} value={form.restaurant_id} InputLabelProps={{ shrink: true, }} /> <br />
        //    </div>

        //    <div class="content-spacing centertext">
        //      <Link to="/restaurants" style={{ textDecoration: 'none' }}> <Button variant="contained">Back</Button> </Link>
        //      <Button onClick={submitForm} variant="outlined">Submit</Button>
        //    </div>

//         //  </Container>
//     )
// }
