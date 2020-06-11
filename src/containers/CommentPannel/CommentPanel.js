import React from 'react'
import { observer, inject } from 'mobx-react'
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@material-ui/core'
import { CommentItem, MessageSnackbar } from "../../components"
class CommentPanel extends React.Component {

    store = this.props.CommentPanelStore
    componentDidMount = () => {
        this.store.history = this.props.history
        this.store.id = this.props.id
        this.store.getInfo()
    }
    render() {

        if (this.store.loader) return (<CircularProgress />); else return (
            <React.Fragment>
                <Box p={4}>
                    <Paper>
                        <Typography component="div" style={{ backgroundColor: '#e9ecef' }}>
                            <Box p={2}>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Комментарий"
                                    multiline
                                    rows="2"
                                    fullWidth
                                    placeholder="Введите текст.."
                                    variant="outlined"
                                    onChange={this.store._messageChange}
                                />
                                <Box mt={1} display="flex" justifyContent="flex-end"><Button variant="outlined" size="small" color="primary" onClick={this.store.sendMessage} >Отправить</Button></Box>

                            </Box>
                        </Typography>
                    </Paper>
                    {this.store.data.map((x, index) => { return (<CommentItem key={`${index}-comment-panel`} data={x} />) })}
                    <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                </Box>
            </React.Fragment>)
    }
}
export default inject('CommentPanelStore')(observer(CommentPanel));