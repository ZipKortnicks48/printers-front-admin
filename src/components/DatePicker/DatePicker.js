
import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers/"

const DatePicker = (props) => {
    let str =""
    let date = null
    if(props.value!==null) 
    {str=props.value.replace('-', '/');date = new Date(str)}
    else {date=null}
    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                    clearable
                    clearLabel="Очистить"
                    // variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    label={props.label}
                    onChange={props.onChange}
                    value={date}
                />
            </MuiPickersUtilsProvider>
        </React.Fragment>
    )
}
export default DatePicker
