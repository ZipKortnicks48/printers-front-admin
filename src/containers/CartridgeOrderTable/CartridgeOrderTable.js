import React from 'react';
import {
    ListItem, ListItemText, Typography, ListItemSecondaryAction, CircularProgress, Box, Paper,
    List, FormControlLabel, Chip, TextField, Button, Dialog,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { getRequest, patchRequest, deleteRequest } from '../../utils/requests'
import { MessageSnackbar,SelectComponent } from '../../components'
import { DialogTableRefill, DialogComebackAll } from '../index'
import SearchIcon from '@material-ui/icons/Search';
export default class CartridgeOrderTable extends React.Component {
    state = {
        data: [],
        loader: true,
        limit: 10,
        cities: [],
        selectedCity: '',
        status: '',
        searchId: '',
        page: 1,

        errorText: '',
        successText: '',

        errorOpen: false,
        successShow: false,

        editedActStatus: '0',

        refilltableShow: false,
        comebackTableShow:false
    }

    statuses = [
        { id: '0', name: 'Ожидает в ОГУПе' },
        { id: '1', name: 'Ожидает заправки' },
        { id: '2', name: 'В заправке' },
        { id: '4', name: 'Закрыт' },
    ]

    _errorClose=()=>{
        this.setState({errorOpen:false})
    }
    errorCallback =async (errorMessage,code)=>{
        await this.setState({loader:false})
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        console.log("PADENIE")
        this.setState({errorText:`Ошибка ${code}`,errorOpen:true})
    }

    componentDidMount = async () => {
        let token = localStorage.getItem("token")
        await getRequest('cities/list/', { resolve: (data) => { this.setState({ cities: data['results'] }) }, reject: this.errorCallback }, token)
        this.getOrders()
    }
    _refillTableOpen = () => {
        this.setState({ refilltableShow: true })
    }
    _refillTableClose = () => {
        this.setState({ refilltableShow: false })
    }
    _comebackTableOpen = () => {
        this.setState({ comebackTableShow: true })
    }
    _comebackTableClose = () => {
        this.setState({ comebackTableShow: false })
    }
    _editedActStatusChange = (event, value) => {
        this.setState({ editedActStatus: event.target.value })
    }
    getOrders = async () => {
        await this.setState({ editedActStatus: '0' })
        let token = localStorage.getItem("token")
        let url = `printers/order_list/?limit=${this.state.limit}&offset=${(this.state.page - 1) * this.state.limit}`
        this.state.selectedCity !== '' ? url += `&city=${this.state.selectedCity}` : url += `&city=0`
        if (this.state.status !== '') url += `&status=${this.state.status}`
        if (this.state.searchId !== '') url += `&id=${this.state.searchId}`
        await getRequest(url, { resolve: (data) => { this.successAct(data) }, reject: this.errorCallback }, token)
    }
    successAct = async (data) => {
        console.log("LOGGGGGGS", data)
        await this.setState({ data: data['results'], loader: false, count_pages: Math.ceil(data['count'] / this.state.limit) })
    }
    _pageChange = async (event, value) => {
        await this.setState({ page: value, loader: true })
        let token = localStorage.getItem("token")
        this.getOrders()
    }
    statusChange = (event, value) => {
        this.setState({ status: event.target.value })
    }
    cityChange = (event, value) => {
        this.setState({ selectedCity: event.target.value })
    }
    idChange = (event, value) => {
        this.setState({ searchId: event.target.value })
    }
    _cancelOrder = async (_id) => {
        await this.setState({ loader: true })
        let token = localStorage.getItem('token')
        deleteRequest(`printers/cancel/`, { id: _id }, { resolve: this.getOrders, reject: this.errorCallback }, token)
    }
    _filterClick = async () => {
        await this.setState({ page: 1, loader: true })
        this.getOrders()
    }
    _closeClick = async (_id) => {
        await this.setState({ loader: true })
        let token = localStorage.getItem('token')
        patchRequest('printers/close/', { id: _id }, { resolve: this.getOrders, reject: this.errorCallback }, token)
    }
    _editStatus = async (_id) => {
        await this.setState({ loader: true })
        let token = localStorage.getItem('token')
        patchRequest('printers/editstatus/', { id: _id, status: this.state.editedActStatus }, { resolve: this.getOrders, reject: this.errorCallback }, token)
    }
    render() {
        if (this.state.loader) { return (<Box height="100px" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>) }
        else {
            return (<React.Fragment>
                <Box display="flex" flexDirection="column">
                    <Box mb={2} color="text.primary" mr={2} fontSize={18} fontWeight={500}>Заказы комплексов</Box>
                    <Box display="flex" alignItems="center">
                        <Box mr={2}><SelectComponent label="Район" items={this.state.cities} onChange={this.cityChange} value={this.state.selectedCity} /></Box>
                        <Box mr={2}><SelectComponent label="Статус" items={this.statuses} onChange={this.statusChange} value={this.state.status} /></Box>
                        <Box mr={2} width={'80px'}><TextField onChange={this.idChange} value={this.state.searchId} label='ID' /></Box>
                        <Box mr={2}><Button size="small" variant="outlined" onClick={this._filterClick}><SearchIcon /></Button></Box>
                        <Box mr={2}><Button size="small" variant="outlined" color="primary" onClick={this._refillTableOpen}>отдать в заправку</Button></Box>
                        <Box mr={2}><Button size="small" variant="outlined" color="primary" onClick={this._comebackTableOpen}>принять из заправки</Button></Box>
                    </Box>
                    <List component="nav" aria-label="mailbox folders">
                        {this.state.data.length === 0 ? <Box m={3} color="text.secondary" mr={2} fontSize={18}>(Заказы не обнаружены)</Box> : this.state.data.map((item, index) => {
                            return (<div key={`${index}-table-order-item`} >
                                <ListItem key={`${index}-table-order-item`} divider={index !== (item.length - 1)}>
                                    <Box display="flex" flexDirection="column">
                                        <ListItemText primary={`${item["id"]}. ${item["cartridge"]["name"]}`} />
                                        <Typography variant="caption" color="textSecondary">{`Заказ картриджа на принтер ${item["printer"]["printer"]["name"]}`}</Typography>
                                        <Typography variant="caption" color="textSecondary">{item["date"]}</Typography>
                                        <Typography variant="caption" color="textSecondary">{`Район ${item["printer"]["cabinet"]["city"]["name"]}`}</Typography>
                                        {item["date_finish"] !== null && <Typography variant="caption" color="textSecondary">{`Заказ был закрыт ${item["date_finish"]}`}</Typography>}
                                        {item["status"] === 0 && <Chip color="primary" size="small" label="Заказ ожидает" />}
                                        {item["status"] === 1 && <Chip size="small" label="Пустой. Ожидает заправку" />}
                                        {item["status"] === 2 && <Chip size="small" label="Заказ в заправке" />}
                                        {item["status"] === 4 && <Chip size="small" type="outlined" label="Закрыт" />}
                                    </Box>
                                    <ListItemSecondaryAction>
                                        <Box display="flex" alignItems="flex-end" mb={1}>
                                            <div style={{ marginRight: 8 }}><SelectComponent items={this.statuses} onChange={this._editedActStatusChange} value={this.state.editedActStatus} /></div>
                                            <div><Button variant="outlined" size="small" onClick={() => { this._editStatus(item['id']) }} ml={1}>OK</Button></div>
                                        </Box>
                                        <Box display="flex" flexDirection="column" alignItems="space-between">
                                            {(item['status'] === 0 || item['status'] === 1) &&
                                                <div><Button
                                                    onClick={() => { this._cancelOrder(item["id"]) }}
                                                    mt={2} size="small" variant="contained" color="secondary">Отклонить заказ</Button>
                                                </div>}
                                            {(item['status'] === 0) && <Box mb={2}><Button onClick={() => { this._closeClick(item['id']) }} mt={2} size="small" variant="contained" color="primary">Закрыть заказ</Button></Box>}
                                        </Box>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
                            )
                        })}
                        <Pagination onChange={this._pageChange} page={this.state.page} count={this.state.count_pages} />
                    </List>
                    <Dialog open={this.state.refilltableShow} onClose={this._refillTableClose} >
                        <DialogTableRefill items={this.state.data} />
                    </Dialog>
                    <Dialog open={this.state.comebackTableShow} onClose={this._comebackTableClose} >
                        <DialogComebackAll items={this.state.data} />
                    </Dialog>
                    <MessageSnackbar open={this.state.errorOpen} severity="error" onClose={this._errorClose} message={this.state.errorText} />
                </Box>
            </React.Fragment>
            )
        }
    }

}
