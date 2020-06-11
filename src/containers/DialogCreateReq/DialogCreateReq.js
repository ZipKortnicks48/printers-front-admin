import React from 'react'
import {inject,observer} from 'mobx-react'
import { Typography, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, CircularProgress } from '@material-ui/core'
import { CheckBox, DatePicker, SelectComponent, MessageSnackbar } from '../../components/index'

 class DialogCreateReq extends React.Component {
    
    store=this.props.DialogCreateReqStore
    componentDidMount=()=>{
        this.store.history=this.props.history
        this.store.getCabinets()
    }
    
    render() {
        
        if(this.store.loader){return(<React.Fragment><DialogContent><CircularProgress/></DialogContent></React.Fragment>)}else{return (
            <React.Fragment>
                <DialogTitle>Создание новой заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для создания заявки заполните форму.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название заявки"
                        fullWidth
                        onChange={this.store._onNameChange}
                    />
                    <Box display="flex" flexDirection="column">
                    <Box mt={2} mb={2}>
                    <TextField
                        fullWidth
                        label="Опишите проблему"
                        multiline
                        rows={6}
                        variant="outlined"
                        onChange={this.store._onDescChange}
                    />
                    </Box>
                    <Box>
                    <Typography  variant="caption">Выберите кабинет</Typography>
                    </Box>
                    <SelectComponent  items={this.store.cabinets} onChange={this.store._onCabinetChange} value={this.store.cabinet} label="Кабинет" />
                    <DatePicker label="Крайний срок" onChange={this.store._onDeadlineChange} value={this.store.deadline}/>
                    <CheckBox onChange={this.store._onCheckoutChange} value={this.store.checkout} label="Запланировать выезд"></CheckBox>
                    <Box mb={1}>
                    <Typography   variant="caption">Укажите телефон, что мы могли Вам перезвонить</Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Телефон для связи"
                        rows={6}
                        variant="outlined"
                        onChange={this.store._onPhoneChange}
                    />
                    </Box>
                    <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                    <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message="Заявка отправлена." />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={this.store._responseClick} color="primary">
                        Создать
                    </Button>
                </DialogActions></React.Fragment>
        )
        }
    }
}
export default inject('DialogCreateReqStore')(observer(DialogCreateReq));