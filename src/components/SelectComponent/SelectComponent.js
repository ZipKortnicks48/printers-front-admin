import React from 'react'
import { InputLabel, Select, MenuItem, FormControl, Box } from '@material-ui/core'
const SelectComponent = (props) => {
    console.log("Из селекта",props.items)
    return (

        <Box className={props.className}><FormControl style={{ minWidth: 120 }} spacing={3} >

            <InputLabel>{props.label}</InputLabel>
            <Select value={props.value} defaultValue={props.defaultValue?props.defaultValue:""} onChange={props.onChange}>
                <MenuItem value={""}>{"Не выбрано"}</MenuItem>
                {
                    props.items.map((x,index) => <MenuItem  key={`${index}-select-item`} value={x['id']}>{`${x['number']?x['number']:""} ${x['surname']?x['surname']:x['name']}`}</MenuItem>)
                }
            </Select>

        </FormControl>
        </Box>

    )
}
export default SelectComponent
