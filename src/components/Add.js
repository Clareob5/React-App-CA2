import axios from '../config/index.js'
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { produce } from 'immer'
import { generate } from "shortid"
import { Grid, Typography, TextField, Button, Box } from '@mui/material/'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MyTextField from './formFields/Input'
import MySelectField from './formFields/Select'
import GradeForm from './GradeForm'

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
            temp.building = formValues.building.length > 3 ? "" : "This field must have at least 3 letters."
        if ('coord1' in formValues)
            temp.coord1 = (/.+,.+..+/).test(formValues.coord1) ? "" : "Coord l is not valid."
        if ('borough' in formValues)
            temp.borough = formValues.borough ? "" : "This field is required."
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

    const handleGrades = e => {
        setGradesList(prevState =>
            produce(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
            ))
        console.log(gradesList)
    }

    const submitForm = () => {
        console.log(form)
        console.log(token)

        axios.post(`/restaurants`, {
            address: {
                building: form.building,
                coord: [form.coord1, form.coord2],
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
    }

    const textFieldStyle = { margin: '8px auto' }

    return (
        <Grid className="App">
            <Box
                className='boxbtn'
                component="span"
                sx={{
                    p: 2,
                    m: 2,
                    backgroundColor: 'black',
                    '&:hover': {
                        backgroundColor: 'lightGray',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                <Button style={{ color: "white" }} onClick={() => { setToggleForm(!toggleForm) }}>
                    <AddCircleOutlineIcon fontSize='small' /><span className="padding">Add Restaurant</span></Button>
            </Box>
            {
                toggleForm &&

                <Grid container spacing={1} sx={{ marginTop: '15px' }} columns={12}>
                    <Grid item xs={12}><h2>Address</h2></Grid>
                    <Grid item xs={4}>
                        <MyTextField label='Building' name="building" onChange={handleForm} error={errors.building} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='number' label='Co-ord Lat' name="coord1" onChange={handleForm} error={errors.coord} />
                        <MyTextField type='number' label='Co-ord Long' name="coord2" onChange={handleForm} error={errors.coord} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='street' label='Street' name="street" onChange={handleForm} error={errors.street} />
                    </Grid>
                    <Grid item xs={4}>
                        <MyTextField type='text' label='Zipcode' name="zipcode" onChange={handleForm} error={errors.zipcode} />
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectField
                            label='Cuisine'
                            name="cuisine"
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
                    <Grid container spacing={1} sx={{ marginTop: '15px' }} columns={12}>
                        <Grid item xs={12}>
                            <Typography>Grade</Typography>
                            <Button
                                    onClick={() => {
                                setGradesList(currentGrades => [
                                    ...currentGrades,
                                    {
                                        id: generate(),
                                        date: null,
                                        grade: "",
                                        score: ""
                                    }
                                ]);
                                console.log(gradesList)
                            }}
                            > add grade </Button>
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
                                    <Grid item xs={4}>
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
                                    <Grid item xs={4}>
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
                                        <Button onClick={() => {
                                            console.log(index)
                                            setGradesList(currentGrades =>
                                                currentGrades.filter(x => x.id !== g.id)
                                                //console.log(currentGrades)
                                                //currentGrades.splice(index, 1);
                                            );

                                        }}>
                                            x
                                        </Button>
                                    </Grid>

                                </Fragment>
                            );
                        })}
                    </Grid>

                    <Box><Button onClick={submitForm}> Submit</Button></Box>
                </Grid>
            }
        </Grid>
    )
}

export default Add