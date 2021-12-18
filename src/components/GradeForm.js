
import { useState, Fragment } from 'react'
import { produce } from 'immer'
import { generate } from "shortid"
import { Grid, Typography, TextField, Button} from '@mui/material/'
import MyTextField from './formFields/Input'

const GradeForm = (props, validateOnChange = false) => {

    const [gradesList, setGradesList] = useState([])
    const [errors, setErrors] = useState({})

    // const validate = (formValues = form) => {
    //     let temp = { ...errors }
    //     if ('building' in formValues)
    //         temp.building = formValues.building.length > 3 ? "" : "This field must have at least 3 letters."
    //     if ('coord1' in formValues)
    //         temp.coord1 = formValues.coord1 ? "" : "Email is not valid."
    //     if ('borough' in formValues)
    //         temp.borough = formValues.borough ? "" : "This field is required."
    //     setErrors({
    //         ...temp
    //     })
    // }

    // const handleForm = e => {
    //     setForm(prevState => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    //     if (validateOnChange)
    //         validate({ [e.target.name]: e.target.value })
    //     console.log(form)
    // }

    const handleGrades = e => {
        setGradesList(items => ({
            ...items,
            date: gradesList.date,
            grade: gradesList.grade,
            score: gradesList.score
        }))
        console.log()
    }

return (
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
                        {
    gradesList.map((g, index) => {
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
                        defaultValue=" "
                        label="Date"
                        type="datetime-local" name="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name='date'
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
    })
}
</Grid >
)

}

export default GradeForm