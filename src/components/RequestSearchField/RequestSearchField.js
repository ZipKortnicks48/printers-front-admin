import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const RequestSearchField = (props) => {
    return (
        <React.Fragment>
            <InputBase
                fullWidth
                onChange={props.onChange}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={props.value}
            />
            <IconButton type="submit" onClick={props.onClick}  aria-label="search">
                <SearchIcon />
            </IconButton>
        </React.Fragment>
    )
}
export default RequestSearchField