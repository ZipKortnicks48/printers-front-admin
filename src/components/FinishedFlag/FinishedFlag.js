import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
export const FinishedFlag = (props) => {

    return (
        <React.Fragment>
            <Box display="flex" edge="end" aria-label="delete">
                <Typography style={{ color: "green" }} >{`Выполнена ${props.item["finishdate"]}`}</Typography>
                <CheckCircle style={{ color: "green" }} />
            </Box>
            
        </React.Fragment>
    )
}