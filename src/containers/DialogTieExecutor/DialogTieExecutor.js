import React from 'react'
import { inject, observer } from 'mobx-react'
import { Typography, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, CircularProgress } from '@material-ui/core'
import { CheckBox, DatePicker, SelectComponent, MessageSnackbar } from '../../components/index'

class DialogTieExecutor extends React.Component {

    store = this.props.DialogTieExecutorStore
    componentDidMount = () => {
        this.store.history = this.props.history
        this.store.reload = this.props.reload
        this.store.getAdmins()
    }

    render() {

        if (this.store.loader) { return (<React.Fragment><DialogContent><CircularProgress /></DialogContent></React.Fragment>) } else {
            return (
                <React.Fragment>
                    <DialogTitle>Назначение исполнителя</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Для назначения исполнителя выбранной задаче выберите его из списка.
                    </DialogContentText>
                        <Box display="flex" flexDirection="column">
                            <Box>
                                <Typography variant="caption">Выберите исполнителя</Typography>
                            </Box>
                            <Box width={400} ><SelectComponent items={this.store.executors} onChange={this.store._onExecutorChange} value={this.store.executor} label="Исполнитель" /></Box>
                        </Box>
                        <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                        <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message="Исполнитель привязан." />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close} color="primary">
                            Отмена
                    </Button>
                        <Button onClick={() => this.store.patchExecutor(this.props.id)} color="primary">
                            Привязать
                    </Button>
                    </DialogActions>
                </React.Fragment>
            )
        }
    }
}
export default inject('DialogTieExecutorStore')(observer(DialogTieExecutor));