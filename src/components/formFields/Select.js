import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const Select = (props) => {

    const { name, label, value, error = null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
            fullWidth
            sx={{ m: 1}}
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
                <MenuItem value="asian">Asian</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="Bakery">Bakery</MenuItem>
                <MenuItem value="Ice Crean">Ice Cream</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
                <MenuItem value="donuts">Donuts</MenuItem>
                <MenuItem value="chicken">Chicken</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="jewish/Kosher">Jewish/Kosher</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select