import React from 'react'
import { inject, observer } from 'mobx-react'
import { CircularProgress, Typography, Box } from '@material-ui/core'
import { CheckoutFlag, FinishedFlag, ActualReqFlag, ProcessReqFlag, MessageSnackbar } from '../../components'
import { DialogTieExecutor } from '../index'
import { Button, Dialog } from '@material-ui/core'
class RequestBody extends React.Component {

    store = this.props.RequestBodyStore
    componentDidMount = () => {
        this.store.id = this.props.id
        this.store.history = this.props.history
        this.store.getInfo()
    }

    render() {
        if (this.store.loader) return (<React.Fragment><Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box></React.Fragment>); else return (
            <React.Fragment>
                <Box p={4}>
                    <Box mb={2}><Typography variant="h2" color="textPrimary">{this.store.data['shortname']}</Typography></Box>
                    <Box mb={4} justifyContent="space-between" display="flex">
                        <Typography variant="body2" color="textSecondary">{`Дата заявки: ${this.store.data['date']}`}</Typography>
                        <Typography variant="body2" color="textSecondary">{`№: ${this.store.data['id']}`}</Typography>
                    </Box>
                </Box>

                <Box mb={2}>
                    <Typography variant="body1" color="textPrimary">{this.store.data['description']}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end"><Box display="flex">
                    {this.store.data["checkout"] && <Box mb={2}><CheckoutFlag /></Box>}
                    {this.store.data["status"] === "3" && <Box mb={2}><FinishedFlag desc={true} item={this.store.data} /></Box>}
                    {this.store.data["status"] === "2" && <Box mb={2}><ProcessReqFlag desc={true} item={this.store.data} /></Box>}
                    {this.store.data["status"] === "1" && <Box mb={2}><ActualReqFlag desc={true} item={this.store.data} /></Box>}
                </Box>

                </Box>
                <Box mb={2}>
                    <Typography variant="body1" color="textSecondary">{`Кабинет: ${this.store.data['cabinet']['name']}, район ${this.store.data['cabinet']['city']['name']}`}</Typography>
                </Box>
                {this.store.data['deadline']!==null&&<Box mb={2}>
                    <Typography variant="body1" color="textSecondary">{`Планируемая дата выполнения: ${this.store.data['deadline']}`}</Typography>
                </Box>}
                <Box mb={2}>
                    <Typography variant="body1" color="textSecondary">{`Номер телефона для обратной связи ${this.store.data['phone']}`}</Typography>
                </Box>
                <Box mt={3} fullWidth display="flex" alignItems="center" justifyContent="space-between">
                    <Box><Button variant="outlined" onClick={() => { this.props.history.push('/requests') }}>{`<< Вернуться к списку заявок`}</Button></Box>
                    <Box>{this.store.data["status"] === "1" &&
                        <Button onClick={this.store._modalOpen} variant="outlined" color="primary">Назначить исполнителя</Button>
                    }{this.store.data["status"]!=="3"&&<Box><Button onClick={()=>this.store._closeReq(this.props.id)} variant="contained" color="primary">Закрыть задачу</Button></Box>}
                    </Box>
                </Box>
                <Dialog open={this.store.modalOpen} onClose={this.store._modalClose}>
                    <Box>
                        <DialogTieExecutor id={this.props.id} history={this.props.history} close={this.store._modalClose} reload={this.store.getInfo} />
                    </Box>
                </Dialog>
                <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message="Заявка успешно закрыта." />
            </React.Fragment>
        )
    }
}

export default inject('RequestBodyStore')(observer(RequestBody));