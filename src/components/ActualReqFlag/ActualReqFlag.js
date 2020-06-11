import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { HourglassFull} from '@material-ui/icons'
export const ActualReqFlag = (props) => {
    return (<React.Fragment><Box color="text.primary" mr={3} display="flex" edge="end" aria-label="delete">
        <Typography >Заявка отправлена</Typography>
        <HourglassFull/>
    </Box>
    <Box >
        
    </Box>
    </React.Fragment>
    )

}