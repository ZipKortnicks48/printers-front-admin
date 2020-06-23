import React from 'react'
import { NewReqFlag } from '../index'
import { Box } from '@material-ui/core'
export const ActualReqFlag = (props) => {
    return (
        <React.Fragment>
            <Box color="text.primary" mr={3} display="flex" edge="end" aria-label="delete">
                <Box display="flex" alignItems="center" mr={3}><NewReqFlag /></Box>
            </Box>
        </React.Fragment>
    )
}