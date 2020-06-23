import React from 'react'
import { Typography, Box, Tooltip } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
export const FinishedFlag = (props) => {

    return (
        <React.Fragment>
            <Box display="flex" edge="end" aria-label="delete">
            <Tooltip title={`Заявка закрыта пользователем ${props.item['executor']['surname']} ${props.item["finishdate"]}`}>
                {/* <Typography style={{ color: "green" }} >{`Выполнена ${props.item["finishdate"]}`}</Typography> */}
                <CheckCircle style={{ color: "green" }} />
                </Tooltip>
            </Box>
            
        </React.Fragment>
    )
}