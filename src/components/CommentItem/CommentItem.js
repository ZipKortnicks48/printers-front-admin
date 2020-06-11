import React from "react"
import { Box, Typography } from "@material-ui/core"
export default class CommentItem extends React.Component {

    render() {
        let { text, date } = this.props.data
        let { phone, mobile_phone, surname } = this.props.data.user
        return (
            <React.Fragment>
                <Box p={2} display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="space-between" >
                        <Box color="text.primary" fontSize={16} fontWeight={500}>{surname}</Box>
                        <Box><Typography variant="body2" color="textSecondary">{date}</Typography></Box>
                    </Box>
                    <Box color="text.primary" mb={2} fontSize={16} >{text}</Box>
                </Box>
            </React.Fragment>
        )
    }
}