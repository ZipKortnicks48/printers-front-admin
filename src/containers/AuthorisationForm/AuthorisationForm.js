import React from 'react';
import { observer, inject } from 'mobx-react'
import { TextField, Box, Button, CircularProgress } from '@material-ui/core'
import { MessageSnackbar } from "../../components/"
import { withRouter } from "react-router";
class AuthorisationForm extends React.Component {
    store = this.props.AuthorisationFormStore
    componentDidMount=()=>{
        this.store.history=this.props.history
        console.log(this.store.history,"История из авторизации")
    }
    render() {
        
        return (
            <React.Fragment>
                <Box display="flex" flexDirection="column" height="100vh" alignItems="center" justifyContent="center">
                    <Box py={3} color="text.primary">Система сбора заявок ОГУП "Липецкоблводоканал"</Box>
                    <Box py={3} fontSize={16} color="text.primary">(приложение для администратора)</Box>
                    <Box py={1}>
                        <TextField onChange={this.store._usernameChange}  color="primary" label="Логин" variant="outlined" />
                    </Box>
                    <Box py={1}>
                        <TextField onChange={this.store._passwordChange}  type="password" label="Пароль" variant="outlined" />
                    </Box>
                    <Box py={1}>
                        {!this.store.buttonLoader ?
                            <Button onClick={this.store._logInClick} variant="contained" color="primary">Войти</Button> :
                            <Button variant="contained" color="primary" disabled><CircularProgress /></Button>
                        }
                        <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message="Неверный логин или пароль" />
                    </Box>
                </Box>
            </React.Fragment>
        )
    }
}

export default withRouter(inject('AuthorisationFormStore')(observer(AuthorisationForm)));