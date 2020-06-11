import React from 'react'

import { TableRequest } from '../../containers/index'
import { Box, Button, Dialog } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router"
import {DialogCreateReq} from "../../containers/index"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
class RequestListPage extends React.Component {
    state={
        modalOpen:false,
    }
    _modalClose = () => {
        this.setState({modalOpen: false})
    }
    _modalOpen = () => {
        this.setState({modalOpen: true})
    }
    render(){
        console.log("Рендеринг страницы")
    return (
        <React.Fragment>
            <Box mb={4} display="flex" flexDirection="row" alignItems="center" fontSize={16} color="text.secondary">Вы вошли под пользователем:
            <Box pl={1} fontSize={16} color="text.primary">{localStorage.getItem('name')}</Box>
                <Box display="flex" flexDirection="row" >
                    <Button onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('name')
                        this.props.history.push('/')
                    }}><ExitToAppIcon fontSize="small" /></Button>
                </Box>
            </Box>
            <TableRequest history={this.props.history}/>
            {/* <Box mt={3} position="absolute">
                <Button onClick={this._modalOpen} variant="contained" color="primary">Создать новую заявку</Button>
            </Box>
            <Dialog open={this.state.modalOpen} onClose={this._modalClose}>
               <Box>
                <DialogCreateReq history={this.props.history} close={this._modalClose}/>
                </Box> 
            </Dialog> */}

        </React.Fragment>)
    }
}
export default withRouter(RequestListPage);