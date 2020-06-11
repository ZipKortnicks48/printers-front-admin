import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { DriveEta } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
export const CheckoutFlag = (props) => {
    return (
        <React.Fragment>
            <Tooltip title="На заявку предполагается выезд">
                <Box mr={3} display="flex" edge="end" aria-label="delete">
                    {/* <Typography style={{ color: "orange" }} >Планировать выезд</Typography> */}
                    <DriveEta style={{ color: "orange" }} />
                </Box>
            </Tooltip>
        </React.Fragment>
    )

}