import React from 'react'
import { RequestBody , CommentPanel} from '../../containers'
import { withRouter } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
class RequestPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <RequestBody history={this.props.history} id={this.props.match.params.number} />
                <Box p={4}  >
                    <Box>
                            <CommentPanel id={this.props.match.params.number} history={this.props.history}/>
                    </Box>
                </Box>
            </React.Fragment>)
    }
}
export default withRouter(RequestPage);