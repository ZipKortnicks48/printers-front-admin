import React, { useState, useEffect } from 'react'
import { CheckBox, MessageSnackbar } from '../../components/index'
import { Box, CircularProgress, Button, DialogTitle } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { getRequest,patchRequest } from '../../utils/requests'
class DialogTableRefill extends React.Component {
    state = {
        data: [],
        ids: [],
        loader: false,
        limit: 10,
        page: 1,
        count_pages: 1,
        errorText: '',
        errorOpen: false,
    }
    _pageChange = async (event, value) => {
        await this.setState({ page: value })
        this.getOrders()
      
    }
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
    componentDidMount =  async ()=>{
        await this.getOrders()
        
    }
    getOrders = async () => {
        await this.setState({ loader: true })
        let token = localStorage.getItem('token')
        let url = `printers/cartridgerefillview/?limit=${this.state.limit}&offset=${(this.state.page - 1) * this.state.limit}`
        await getRequest(url, { resolve: this.successGetTable, reject: () => { this.setState({ loader: false }) } }, token)
    }
    successGetTable = async (data) => {
        await this.setState({ data: data['results'], count_pages: Math.ceil(data['count'] / this.state.limit) })
        this.setState({loader:false})
    }
    handleCheckBoxCheck = (e) => {
        var val = e.target.value
        if (e.target.checked) {
            this.setState((prevState, props) => { const ids = prevState.ids.push(val); return (ids) })
            
        } else {
            this.setState((prevState, props) => {
                let index = prevState.ids.indexOf(val);
                const ids = prevState.ids.splice(index, 1); return (ids)
            })
        }
    }
    _refillClick= async () =>{
        await this.setState({loader:true})
        let token=localStorage.getItem('token')
        let url=`printers/refilall/`
        await patchRequest(url,{ids:this.state.ids},{resolve:this.getOrders,reject:this.errorCallback},token)
    }
    render() {

        if (this.state.loader) { return (<React.Fragment><Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box></React.Fragment>) } else {
            return (
                <Box p={5} display="flex" flexDirection="column">
                    <DialogTitle>Отметить ненужные картриджи</DialogTitle>
                    {
                        this.state.data.map(
                            (item, index) => {
                                return (
                                    <Box alignItems="center" key={`${index}-dialog-table-refill`} mt={1} display="flex" >
                                        <Box mr={1}><CheckBox checked={this.state.ids.includes(String(item['id']))} value={item['id']} onChange={this.handleCheckBoxCheck} /></Box>
                                        <Box>{`${item['id']} - ${item["printer"]["cabinet"]["city"]["name"]} - ${item["cartridge"]["name"]}`}</Box>
                                    </Box>
                                )
                            }
                        )
                    }
                    <Pagination count={this.state.count_pages} onChange={this._pageChange} page={this.state.page} />
                    <Button onClick={this._refillClick}>Отдать в заправку</Button>
                    <MessageSnackbar open={this.state.errorOpen} severity="error" onClose={this._errorClose} message={this.state.errorText} />
                </Box>
            )
        }
    }
}
export default DialogTableRefill;