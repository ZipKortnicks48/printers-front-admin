import React, { useState } from "react"
import { getRequest, patchRequest } from '../../utils/requests'
import { CircularProgress, Box, Paper, TextField } from '@material-ui/core'
import { isThisSecond } from "date-fns"
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
export default class CartridgeTable extends React.Component {
    state = {
        data: [],
        loader: true,
        editMode: false,
        editedIndex: '0',
        count:0,
        reserved_count:0
    }
    componentDidMount = () => {
        this.getTable()
        // this.setState({loader:false})
    }
    getTable=async ()=>{
        let token = localStorage.getItem("token")
        await getRequest('printers/cartridges/', { resolve: (data) => { this.successCartridges(data) }, reject: () => { this.setState({ loader: false }) } }, token)
    }
    successCartridges = (data) => {
        this.setState({ data: data['results'], loader: false })
    };
    editClick = (index,count,reserved_count) => {
        this.setState({ editedIndex: index, editMode: true,count:count,reserved_count:reserved_count })
    };
    okClick = async () => {
        await this.setState({ editMode: false, loader:true })
        let token=localStorage.getItem('token')
        await patchRequest('printers/tableedit/',{id:this.state.editedIndex,count:this.state.count,reserved_count:this.state.reserved_count},
        {resolve:this.getTable,reject:()=>{}},token)

    };
    onCountChange=(e)=>{
        this.setState({count:e.target.value})
    }
    onReservedCountChange=(e)=>{
        this.setState({reserved_count:e.target.value})
    }
    render() {
        console.log(this.state.data,"От принтеров")
        if (this.state.loader) { return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>) }
        else {
            return (<React.Fragment>
                <Box width={500} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box mb={2} color="text.primary" fontSize={18} fontWeight={500}>Картриджи в наличии</Box>
                    <Box mb={2} display="flex" justifyContent="space-between">
                    <Box width="100px" mr={3} fontSize={18} fontWeight={300}>Название</Box>
                    <Box mr={3} fontSize={18} fontWeight={200}>В наличии</Box>
                    <Box fontSize={18} fontWeight={200}>В резерве</Box>
                    <Box fontSize={18} fontWeight={200}>ред.</Box>
                    </Box>
                    {this.state.data.map((x, index) => {
                        return (
                            <div key={`${index}-table-cartridge-item`} style={{ display: "flex", justifyContent: "space-between" }}>
                                <Box width='100px' color="text.primary" mr={3} fontSize={16}>{x["name"]}</Box>
                                {!(this.state.editedIndex == x['id'] && this.state.editMode) ?
                                    <React.Fragment><Box color="text.secondary" mr={3} fontSize={16}>{`${x["count"]} (шт.)`}</Box>
                                        <Box color="text.secondary" fontSize={16}>{`${x['reserved_count']} (шт.)`}</Box>
                                        <EditIcon onClick={() => this.editClick(x['id'],x['count'],x['reserved_count'])} />
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Box width='60px'><TextField onChange={this.onCountChange} defaultValue={x['count']}  size="small" variant="outlined" /></Box>
                                        <Box width='60px'><TextField onChange={this.onReservedCountChange} defaultValue={x['reserved_count']}  size="small" variant="outlined"/></Box>
                                        <CheckIcon onClick={this.okClick} />
                                    </React.Fragment>
                                }
                            </div>
                        )
                    })}
                </Box>
            </React.Fragment>
            )
        }
    }

}
