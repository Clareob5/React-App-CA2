import { useState, useEffect, Fragment } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { produce } from 'immer'
import { generate } from "shortid"
import axios from '../../config';
import SelectField from '../formFields/Select'
import MyTextField from '../formFields/Input'
import moment from 'moment'
import { CircularProgress } from '@mui/material';

const Edit = (validateOnChange = false) => {

    let navigate = useNavigate()
    let { id } = useParams()
    let token = localStorage.getItem('token')

    const [form, setForm] = useState({})
    const [gradesList, setGradesList] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

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

    // const validateGrades = (formValues = gradesList) => {
    //     let temp = { ...errors }
    //     if ('date' in formValues)
    //         temp.date = formValues.date ? "" : "This field is required."
    //     if ('grade' in formValues) {
    //         temp.grade = formValues.grade.length === 1 ? "" : "This field must have only 1 letter in it"
    //     }
    //     if ('score' in formValues)
    //         temp.score = formValues.score.length < 4 ? "" : "This field must contain less than 4 number."
    //     setErrors({
    //         ...temp
    //     })
    // }

    useEffect(() => {
        axios.get(`/restaurants/${id}`)
            .then(response => {
                console.log(response.data.restaurant)
                setForm(response.data.restaurant)
                setGradesList(response.data.restaurant.grades);
                setLoading(false)
                //console.log(form)
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    }, [id])

    if (!form) return null


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

    const makeGrades = () => {
        setGradesList(currentGrades => [
            ...currentGrades,
            {
                _id: generate(),
                date: 'yyyy-MM-ddThh:mm',
                grade: "",
                score: ""
            }
        ]);
    }

    const submitForm = () => {
        console.log(form.address.coord)

        axios.put(`/restaurants/${id}`, {
            address: {
                building: form.address.building,
                coord: form.address.coord,
                street: form.address.street,
                zipcode: form.address.zipcode
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
                    navigate(`/restaurants/${id}`);

                })
                .catch(err => {
                    console.log(`Error: ${err}`)
                    console.log(err.response)
                    setErrors(err.response.data)
                })
    }

    const btnstyle = {
        margin: '8px 0', width: 100, color: '#fef', borderRadius: 5, background: '#c74402', '&:hover': {
            backgroundColor: '#aa3b04',
        },
    }
    const btnstyleAddG = {
        margin: '8px 0', width: 130, color: '#fef', borderRadius: 5, background: '#000', '&:hover': {
            backgroundColor: '#aa3b04',
        },
    }

    return (
        <>
            {!loading ? <>
                <Grid container spacing={5} columns={12} style={{ marginLeft: 5 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ marginTop: 5, fontSize: 30, fontWeight: 400, textAlign: 'center' }}>Edit Restaurant</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <MyTextField type='text' label='Borough' name="borough" value={form.borough} onChange={handleForm()} error={errors.borough} />
                        <SelectField
                            label='Cuisine'
                            name="cuisine"
                            onChange={handleForm()}
                            error={errors.cuisine}
                            value={form.cuisine} />
                        <MyTextField type='text' label='Name' name="name" value={form.name} onChange={handleForm()} error={errors.name} />
                        <MyTextField type='number' label='Restaurant ID' name="restaurant_id" value={form.restaurant_id} onChange={handleForm()} error={errors.restaurant_id} />
                    </Grid>
                    <Grid item xs={5}>
                        <MyTextField type="text" label='Building' name="building" value={form.address.building} onChange={handleForm('address')} error={errors.building} />
                        <MyTextField type='text' label='Co-ord' name="coord" value={form.address.coord} onChange={handleForm('address')} error={errors.coord} />
                        <MyTextField type='text' label='Street' name="street" value={form.address.street} onChange={handleForm('address')} error={errors.street} />
                        <MyTextField type='text' label='Zipcode' name="zipcode" value={form.address.zipcode} onChange={handleForm('address')} error={errors.zipcode} />
                    </Grid>
                    <Grid container spacing={3} sx={{ marginTop: '15px', marginLeft: '30px', marginRight: '30px' }} columns={10}>
                        <Grid item xs={10}>
                            <Typography sx={{ fontSize: 20, fontWeight: 400, borderBottom: 0.5, borderColor: 'grey.400' }}>Grades</Typography>
                            <Button
                                sx={btnstyleAddG} onClick={makeGrades} > add grade </Button>
                        </Grid>
                        {gradesList.map((g, index) => {
                            return (
                                <Fragment key={form.grades._id}>
                                    <Grid item xs={3}>
                                        <Box className="padding" style={{ border: '1px solid #c74402' }}>
                                            <MyTextField
                                                onChange={e => {
                                                    const date = e.target.value;
                                                    setGradesList(currentGrades =>
                                                        produce(currentGrades, v => {
                                                            v[index].date = date;
                                                        })
                                                    );
                                                }}
                                                value={moment(g.date).format("yyyy-MM-DDThh:mm")}
                                                label="Date"
                                                type="datetime-local"
                                                defaultValue={moment(g.date).format("yyyy-MM-DDThh:mm")}
                                                name="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <MyTextField
                                                onChange={e => {
                                                    const grade = e.target.value;
                                                    setGradesList(currentGrades =>
                                                        produce(currentGrades, v => {
                                                            v[index].grade = grade;
                                                        })
                                                    );
                                                    // if (validateOnChange)
                                                    //     validateGrades({ [e.target.name]: e.target.value })
                                                }}
                                                error={errors.grade}
                                                value={g.grade}
                                                label="Grade"
                                                name='grade'
                                            />
                                            <MyTextField
                                                onChange={e => {
                                                    const score = e.target.value;
                                                    setGradesList(currentGrades =>
                                                        produce(currentGrades, v => {
                                                            v[index].score = score;
                                                        })
                                                    );
                                                    // if (validateOnChange)
                                                    //     validateGrades({ [e.target.name]: e.target.value })
                                                }}
                                                fullWidth
                                                value={g.score}
                                                label="Score"
                                                name='score'
                                            />
                                        </Box>
                                    </Grid>
                                </Fragment>
                            );
                        })}
                        
                    </Grid>
                    <Box sx={{ mx: 'auto', paddingTop: 1 }}><Button sx={btnstyle} onClick={submitForm}> Submit</Button></Box>
                </Grid>
            </>
                :
                <>
                    <CircularProgress className="loading" />
                </>
            }





        </>

    )
}

export default Edit
