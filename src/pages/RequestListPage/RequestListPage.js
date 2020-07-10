// import React from 'react'

// import { TableRequest } from '../../containers/index'
// import { Box, Button, Dialog } from '@material-ui/core'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { withRouter } from "react-router"
// import {DialogCreateReq} from "../../containers/index"
// import AppBar from '@material-ui/core/AppBar';
// import { Tab, Tabs } from '@material-ui/core'

// import { DialogCreateReq,PrintersPanel } from "../../containers/index"
// class RequestListPage extends React.Component {
//     state={
//         modalOpen:false,
//     }
//     _modalClose = () => {
//         this.setState({modalOpen: false})
//     }
//     _modalOpen = () => {
//         this.setState({modalOpen: true})
//     }
//     render(){
//         console.log("Рендеринг страницы")
//     return (
//         <React.Fragment>
//             <Box mb={4} display="flex" flexDirection="row" alignItems="center" fontSize={16} color="text.secondary">Вы вошли под пользователем:
//             <Box pl={1} fontSize={16} color="text.primary">{localStorage.getItem('name')}</Box>
//                 <Box display="flex" flexDirection="row" >
//                     <Button onClick={() => {
//                         localStorage.removeItem('token')
//                         localStorage.removeItem('name')
//                         this.props.history.push('/')
//                     }}><ExitToAppIcon fontSize="small" /></Button>
//                 </Box>
//             </Box>
//             <TableRequest history={this.props.history}/>

//         </React.Fragment>)
//     }
// }
// export default withRouter(RequestListPage);

import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Tab, Tabs } from '@material-ui/core'
import { TableRequest } from '../../containers/index'
import { Box, Button, Dialog } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router"
import { DialogCreateReq,PrinterPanel } from "../../containers/index"
class RequestListPage extends React.Component {
    state = {
        modalOpen: false,
        indexTab: 0,
    }
    _modalClose = () => {
        this.setState({ modalOpen: false })
    }
    _modalOpen = () => {
        this.setState({ modalOpen: true })
    }
    a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    handleChange = (event, newValue) => {
        this.setState({indexTab:newValue});
      };
    
     handleChangeIndex = (index) => {
        this.setState({indexTab:index});
    };

    render() {
        
        return (
            <React.Fragment>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.indexTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Заявки в ИТ-отдел" {...this.a11yProps(0)} />
                        <Tab label="Принтеры" {...this.a11yProps(1)} />
                        <Tab label="Картриджи (в разработке)" {...this.a11yProps(2)} />
                    </Tabs>
                </AppBar>
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
                <div
                    role="tabpanel"
                    hidden={0 !== this.state.indexTab}
                    id={`full-width-tabpanel-${this.state.indexTab}`}
                    aria-labelledby={`full-width-tab-${this.state.indexTab}`}
                    
                >
                   
                    <TableRequest history={this.props.history} />
                </div>
                <div
                    role="tabpanel"
                    hidden={1 !== this.state.indexTab}
                    id={`full-width-tabpanel-${this.state.indexTab}`}
                    aria-labelledby={`full-width-tab-${this.state.indexTab}`}
                    
                >
                    <PrinterPanel history={this.props.history}/>
                </div> 
                <div
                    role="tabpanel"
                    hidden={2 !== this.state.indexTab}
                    id={`full-width-tabpanel-${this.state.indexTab}`}
                    aria-labelledby={`full-width-tab-${this.state.indexTab}`}
                    
                >
                    <div style={{"color":"black"}}>Раздел будет доступен в следующих релизах.</div>
                </div>
                <Dialog open={this.state.modalOpen} onClose={this._modalClose}>
                    <Box>
                        <DialogCreateReq history={this.props.history} close={this._modalClose} />
                    </Box>
                </Dialog> 

            </React.Fragment>)
    }
}
export default withRouter(RequestListPage);