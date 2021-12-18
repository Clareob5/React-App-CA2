import { useState, useEffect, Fragment } from 'react'
import { Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { produce } from 'immer'
import { generate } from "shortid"
import axios from '../config';
import SelectField from './formFields/Select'
import MyTextField from './formFields/Input'

const Edit = (validateOnChange = false) => {


    let navigate = useNavigate()
    let { id } = useParams()
    let token = localStorage.getItem('token')

    const [form, setForm] = useState({})
    const [restaurant, setRestaurant] = useState(null)
    const [gradesList, setGradesList] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    const validate = (formValues = form) => {
        let temp = { ...errors }
        if ('building' in formValues)
            temp.building = formValues.building.length > 2 ? "" : "This field must have at least 3 numbers."
        if ('coord' in formValues) {
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
                setGradesList(response.data.restaurant.grades);
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
        console.log(form.borough)
            //can just pass in form
            axios.put(`/restaurants/${id}`, {
                address: {
                    building: form.address.building,
                    coord: [form.address.coord],
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
                    console.log(response.data.restaurant)
                    navigate(`/restaurants/${id}`);

                    //
                    // setAuthenticated(true)
                })
                .catch(err => console.log(err))
    }


    return (
        <>
            <h2>Edit Restaurant</h2>

            <Grid container spacing={1}>
                {!loading ? <>
                    <MyTextField type='text' label='Borough' name="borough" value={form.borough} onChange={handleForm()} error={errors.borough} />
                    <SelectField
                        label='Cuisine'
                        name="cuisine"
                        onChange={handleForm()}
                        error={errors.cuisine}
                        value={form.cuisine} />
                    <MyTextField type='text' label='Name' name="name" value={form.name} onChange={handleForm()} error={errors.name} />
                    <MyTextField type='number' label='Restaurant ID' name="restaurant_id" value={form.restaurant_id} onChange={handleForm()} error={errors.restaurant_id} />
                    <h4>Address</h4>
                    <MyTextField type="text" label='Building' name="building" value={form.address.building} onChange={handleForm('address')} error={errors.building} />
                    <MyTextField type='text' label='Co-ord Lat' name="coord" value={form.address.coord} onChange={handleForm('address')} error={errors.coord} />
                    <MyTextField type='text' label='Street' name="street" value={form.address.street} onChange={handleForm('address')} error={errors.street} />
                    <MyTextField type='text' label='Zipcode' name="zipcode" value={form.address.zipcode} onChange={handleForm('address')} error={errors.zipcode} />
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
                                        <MyTextField
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
                                            // defaultValue="yyyy-MM-DDThh:mm"
                                            name="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyTextField
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
                                        <MyTextField
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
                </>
                    :
                    <div>Loading</div>
                }

            </Grid>


            <Button onClick={submitForm}> Submit</Button>
        </>

    )
}

export default Edit
