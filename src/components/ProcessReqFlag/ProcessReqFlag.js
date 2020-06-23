import React from 'react'
import { Typography, Box, Tooltip, Chip } from '@material-ui/core'
import { AccessTime} from '@material-ui/icons'
export const ProcessReqFlag = (props) => {
    return (
    <React.Fragment>
        
        <Tooltip title={`Заявка находится на исполнении у ${props.item['executor']['surname']}`}>
        <Box  mr={3} color="info.main" display="flex" edge="end" aria-label="delete">
        {/* <Typography>На исполнении</Typography> */}
        <AccessTime />
        
    </Box>
    </Tooltip>
    <Box>
        {props.desc&&<Box mt={8}><Box><Typography variant="body1" style={{color:"green"}}>{`Исполнитель: ${props.item['executor']['surname']}`}</Typography></Box>
        <Box><Typography variant="body1" color="textSecondary">{`Телефон: ${props.item['executor']['mobile_phone']}`}</Typography>
        <Typography variant="caption" color="textSecondary">{`Телефон отдела: ${props.item['executor']['phone']}`}</Typography>
        </Box></Box>}
    </Box>
    </React.Fragment>
    )

}