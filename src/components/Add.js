import axios from '../config/index.js'
import { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { produce } from 'immer'
import { generate } from "shortid"
import { Grid, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material/'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Add = props => {

    const [form, setForm] = useState(null)
    const [toggleForm, setToggleForm] = useState(true)
    const [gradesList, setGradesList] = useState([])

    let token = localStorage.getItem('token')
    let navigate = useNavigate()

    const handleForm = e => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        console.log(form)
    }

    const handleGrades = e => {
        setGradesList(items => ({
            ...items,
            date: gradesList.date,
            grade: gradesList.grade,
            score: gradesList.score
        }))
        console.log()
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
                        <TextField style={textFieldStyle} label='Building' name="building" onChange={handleForm} placeholder="Enter Building number" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField style={textFieldStyle} type='number' label='Co-ord 1' name="coord1" onChange={handleForm} placeholder="Enter first coordinate" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField style={textFieldStyle} type='number' label='Co-ord 2' name="coord2" onChange={handleForm} placeholder="Enter second coordinate" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField style={textFieldStyle} type='street' label='Street' name="street" onChange={handleForm} placeholder="Enter street name" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField style={textFieldStyle} type='text' label='Zipcode' name="zipcode" onChange={handleForm} placeholder="Enter Zipcode" />
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="cuisine-select-label">Cuisine</InputLabel>
                        <Select
                            labelId="cuisine-select-label"
                            label='Cuisine'
                            name="cuisine"
                            defaultValue=""
                            onChange={handleForm}
                        >
                            <MenuItem value="american">American</MenuItem>
                            <MenuItem value="delicatessen">Delicatessen</MenuItem>
                            <MenuItem value="Turkish">Turkish</MenuItem>
                            <MenuItem value="asian">Asian</MenuItem>
                            <MenuItem value="chinese">Chinese</MenuItem>
                            <MenuItem value="Bakery">Bakery</MenuItem>
                            <MenuItem value="Ice Crean">Ice Cream</MenuItem>
                            <MenuItem value="japanese">Jewish/Kosher</MenuItem>
                            <MenuItem value="donuts">Donuts</MenuItem>
                            <MenuItem value="chicken">Chicken</MenuItem>
                            <MenuItem value="Indian">Indian</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField style={textFieldStyle} type='text' label='Borough' name="borough" onChange={handleForm} placeholder="Enter Borough" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField style={textFieldStyle} type='text' label='Name' name="name" onChange={handleForm} placeholder="Name" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField style={textFieldStyle} type='number' label='Restaurant ID' name="restaurant_id" onChange={handleForm} placeholder="Restaurant id" />
                    </Grid>
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
                                            value={g.date}
                                            label="Date"
                                            type="datetime-local" name="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="Date"
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
                                            value={g.grade}
                                            placeholder=" Grade"
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
                                            value={g.score}
                                            placeholder=" score"
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
                    {/* <TextField
                                    onChange={e => {
                                        const score = e.target.value;
                                        setPeople(currentGrades =>
                                            produce(currentGrades, v => {
                                                v[index].score = score;
                                            })
                                        );
                                    }}
                                    value='score'
                                    placeholder="Score"
                                    style={textFieldStyle} type='number' label='Score' name="score"
                               />
                                <button
                                    onClick={() => {
                                        setPeople(currentGrades =>
                                            currentGrades.filter(x => x.id !== p.id)
                                        );
                                    }}
                                >
                                    x
                                </button> */}
                    {/* <TextField style={textFieldStyle} type='date' id="datetime-local"
                        label="Date"
                        type="datetime-local" name="date" onChange={handleGrades} InputLabelProps={{
                        shrink: true,
                    }}/>
                    <TextField style={textFieldStyle} type='text' label='Grade' name="grade" onChange={handleGrades} placeholder="A-Z" />
                    <TextField style={textFieldStyle} type='number' label='Score' name="score" onChange={handleGrades} placeholder="Score" /> */}

                    <Box><Button onClick={submitForm}> Submit</Button></Box>
                </Grid>
            }
        </Grid>
    )
}

export default Add