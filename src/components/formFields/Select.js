import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const Select = (props) => {

    const { name, label, value, error = null, onChange } = props;

    return (
        <FormControl variant="outlined"
            fullWidth
            style={{ margin: 10}}
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                defaultValue={value}
                >
                
                <MenuItem value="">None</MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Delicatessen">Delicatessen</MenuItem>
                <MenuItem value="Turkish">Turkish</MenuItem>
                <MenuItem value="Asian">Asian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Bakery">Bakery</MenuItem>
                <MenuItem value="Ice Crean">Ice Cream</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Donuts">Donuts</MenuItem>
                <MenuItem value="Chicken">Chicken</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Jewish/Kosher">Jewish/Kosher</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select