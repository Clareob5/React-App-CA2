import axios from '../../config/index.js'
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { produce } from 'immer'
import { generate } from "shortid"
import { Grid, Typography, TextField, Button, Box, Paper } from '@mui/material/'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MyTextField from '../formFields/Input'
import MySelectField from '../formFields/Select'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Add = (props, validateOnChange = false) => {

    const [form, setForm] = useState(null)
    const [toggleForm, setToggleForm] = useState(false)
    const [gradesList, setGradesList] = useState([])
    const [errors, setErrors] = useState({})

    let token = localStorage.getItem('token')
    let navigate = useNavigate()

    const validate = (formValues = form) => {
        let temp = { ...errors }
        if ('building' in formValues)
            temp.building = formValues.building.length > 2 ? "" : "This field must have at least 3 numbers."
        if ('coord' in formValues) {
            temp.coord = formValues.coord.indexOf(",") > -1 ? "" : "Coordinates must be separated by a comma."
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

    const handleForm = e => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        if (validateOnChange)
            validate({ [e.target.name]: e.target.value })
        console.log(form)
    }

    const makeGrades = () => {
        setGradesList(currentGrades => [
            ...currentGrades,
            {
                id: generate(),
                date: '',
                grade: "",
                score: ""
            }
        ]);
        console.log(gradesList)
    }

    const submitForm = () => {
        let coordArray= form.coord.split(',')
        let coords= coordArray.map(function (x) {
            return parseInt(x, 10);
        });
        console.log(token)
        //if (validate()) {
        axios.post(`/restaurants`, {
            address: {
                building: form.building,
                coord:  coords,
                street: form.street,
                zipcode: form.zipcode
            },
            borough: form.borough,
            cuisine: form.cuisine,
            grades: gradesList,
            name: form.name,
            restaurant_id: form.restaurant_id
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })
            .then(response => {
                console.log(response.data)
                navigate(`/restaurants/${response.data.restaurant._id}`, { replace: true })
                setToggleForm(!toggleForm)
            })
            .catch(err => {
                console.log(form)
                console.log(`Error: ${err}`)
                console.log(err.response.data)
                setErrors(err.response.data)
            })
   // }
}

    const btnstyle = {
        margin: '8px 0', width: 100, color: '#fef', borderRadius: 5, background: '#c74402',  '&:hover': {
            backgroundColor: '#aa3b04',
        },}
    const btnstyleAddG = {
        margin: '8px 0', width: 130, color: '#fef', borderRadius: 5, background: '#000', '&:hover': {
            backgroundColor: '#aa3b04',
        },
    }
    return (
        <Grid className="App">
            <Box
                className='boxbtn'
                component="span"
                sx={{
                    p: 2,
                    m: 2,
                    borderRadius: 5,
                    backgroundColor: 'black',
                    '&:hover': {
                        backgroundColor: 'gray',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                <Button style={{ color: "white"  }} onClick={() => { setToggleForm(!toggleForm) }}>
                    <AddCircleOutlineIcon fontSize='small' /><span className="paddingLeft">Add Restaurant</span></Button>
            </Box>
            {
                toggleForm &&
                <Paper sx={{ paddingRight: 3 }}  >
                <Grid container spacing={2} sx={{ marginTop: '15px' }} columns={12}>
                  
                    <Grid item xs={4}>
                        <MyTextField label='Building' name="building" onChange={handleForm} error={errors.building} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='text' label='Co-ord' name="coord" onChange={handleForm} error={errors.coord} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='street' label='Street' name="street" onChange={handleForm} error={errors.street} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='number' label='Zipcode' name="zipcode" onChange={handleForm} error={errors.zipcode} />
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectField
                            label='Cuisine'
                            name="cuisine"
                            defaultValue=""
                            onChange={handleForm}
                            error={errors.cuisine}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='text' label='Borough' name="borough" onChange={handleForm} error={errors.borough} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='text' label='Name' name="name" onChange={handleForm} error={errors.name} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='number' label='Restaurant ID' name="restaurant_id" onChange={handleForm} error={errors.restaurant_id} />
                    </Grid>
                    {/* <GradeForm gradesList={gradesList} /> */}
                    <Grid container spacing={1} sx={{ marginTop: '15px', m:2 }} columns={12}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 20, fontWeight: 400, borderBottom: 0.5, borderColor: 'grey.400'}}>Grades</Typography>
                            <Button
                                onClick={makeGrades}
                                className="submitbtn" 
                                sx={btnstyleAddG}

                            > Add Grade </Button>
                        </Grid>
                        {gradesList.map((g, index) => {
                            return (
                                <Fragment key={g.id}>
                                    <Grid item xs={4}>
                                        <TextField
                                            onChange={e => {
                                                const date = e.target.value;
                                                setGradesList(currentGrades =>
                                                    produce(currentGrades, v => {
                                                        v[index].date = date;
                                                    })
                                                );
                                            }}
                                            fullWidth
                                            value={g.date}
                                            label="Date"
                                            type="datetime-local"
                                            defaultValue="yyyy-MM-DDThh:mm"
                                            name="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            onChange={e => {
                                                const grade = e.target.value;
                                                setGradesList(currentGrades =>
                                                    produce(currentGrades, v => {
                                                        v[index].grade = grade;
                                                    })
                                                );
                                            }}
                                            fullWidth
                                            value={g.grade}
                                            label="Grade"
                                            name='grade'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            onChange={e => {
                                                const score = e.target.value;
                                                setGradesList(currentGrades =>
                                                    produce(currentGrades, v => {
                                                        v[index].score = score;
                                                    })
                                                );
                                            }}
                                            fullWidth
                                            value={g.score}
                                            label="Score"
                                            name='score'
                                        />
                                    </Grid>
                                        <Grid item xs={2}>
                                        <Button onClick={() => {
                                            console.log(index)
                                            setGradesList(currentGrades =>
                                                currentGrades.filter(x => x.id !== g.id)
                                            );

                                        }}>
                                            <DeleteOutlineIcon sx={{ marginTop: 1, color: 'red', fontSize: 30}} />
                                        </Button>
                                    </Grid>
                                    

                                </Fragment>
                            );
                        })}
                    </Grid>
                            <Box sx={{ mx: 'auto' }}><Button className="submitbtn" sx={btnstyle} onClick={submitForm}> Submit</Button></Box>
                </Grid>
             </Paper>
            }
        </Grid>
    )
}

export default Add