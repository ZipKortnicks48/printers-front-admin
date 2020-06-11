import React from 'react';
import { observer, inject } from 'mobx-react'
import { SelectComponent, RequestSearchField, DatePicker, CheckBox, TableReqItem, MessageSnackbar } from '../../components'
import {
    ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, CircularProgress, Box, Paper,
    List, FormControlLabel
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withRouter } from "react-router";
import classNames from "./tablerequest.module.css"
import {Pagination} from "@material-ui/lab"
class TableRequest extends React.Component {

    store = this.props.TableRequestStore
    componentDidMount = () => {
        console.log("Дид маунт")
        this.store.history = this.props.history
        this.store.getCabinets()
    }
    _onReqClick=(id)=>{
        this.props.history.push(`requests/${id}`)
    }
    
    render() {
        if (this.store.tableLoader) { return (<CircularProgress />) } else {
            console.log(this.store.reqs,"Это заявки1, а тэбллоадер", this.store.tableLoader)
            return (
                <React.Fragment>
                    <Box mb={2}>
                        <ExpansionPanel>
                            <Box width={"100%"}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <FormControlLabel
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<RequestSearchField
                                            onClick={this.store._filterClick}
                                            onChange={this.store._searchwordChange}
                                            value={this.store.searchword}
                                            placeholder="Введите название или номер заявки" />
                                        }
                                        style={{ width: '100%' }}
                                    />
                                </ExpansionPanelSummary>
                            </Box>
                            <ExpansionPanelDetails>
                                <DatePicker label="Укажите дату" value={this.store.date} onChange={this.store._dateChange} />
                                <SelectComponent value={this.store.cabinet} items={this.store.cabinets} onChange={this.store._cabinetChange} label="Кабинет" className={classNames.select} />
                                <CheckBox checked={this.store.showClosedRequests} onChange={this.store._showClosedRequests} className={classNames.checkbox} label="Отобразить не закрытые заявки" />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Box>
                    <Paper>
                        <List component="nav" aria-label="mailbox folders">
                            <TableReqItem onClick={this._onReqClick} items={this.store.reqs} />
                        </List>
                    </Paper>
                    <Pagination page={this.store.page} onChange={this.store._pageChange} count={this.store.count_pages} shape="rounded" />
                    {/* <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} /> */}
                </React.Fragment>
            )
        }
    }
}

export default withRouter(inject('TableRequestStore')(observer(TableRequest)));