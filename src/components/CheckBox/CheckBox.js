
import React from 'react'
import {FormControlLabel,Checkbox,Box} from '@material-ui/core'
const CheckBox = (props) => {
    return (
        <Box className={props.className}>
           <FormControlLabel 
                            
                            control={
                                <Checkbox
                                    onChange={props.onChange}
                                    color="primary"
                                    checked={props.checked}
                                />
                            }
                            label={props.label}
                        />
        </Box>
    )
}
export default CheckBox