import React from 'react'
import { TextField } from '@mui/material';

const Input = (props) => {

    //all the values to have as props for textField
    const { name, label, value,type, error = null, onChange } = props;
    const textFieldStyle = { margin: 10 }

    return (
        <TextField
            fullWidth
            style={textFieldStyle}            
            variant="outlined"
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
            {...(error && { error: true, helperText: error })} //shows error helptext if theres an error
        />
    )
}

export default Input
