import React from 'react';
import { observer, inject } from 'mobx-react'
import { SelectComponent, RequestSearchField, DatePicker, CheckBox, TableReqItem, MessageSnackbar, NewReqFlag, ProcessReqFlag, CheckoutFlag } from '../../components'
import {
    ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, CircularProgress, Box, Paper,
    List, FormControlLabel, Tooltip
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withRouter } from "react-router";
import classNames from "./tablerequest.module.css"
import { Pagination } from "@material-ui/lab"
import { AccessTime,CheckCircle } from "@material-ui/icons"
class TableRequest extends React.Component {

    store = this.props.TableRequestStore
    componentDidMount = () => {
        console.log("Дид маунт")
        this.store.history = this.props.history
        this.store.getFirstData()
    }
    _onReqClick = (id) => {
        this.props.history.push(`requests/${id}`)
    }

    render() {
        if (this.store.tableLoader) { return (<React.Fragment><Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box></React.Fragment>) } else {
            console.log(this.store.reqs, "Это заявки1, а тэбллоадер", this.store.tableLoader)
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
                                <Box display="flex" flexDirection="column">
                                    <Box display="flex">
                                        <DatePicker label="Укажите дату" value={this.store.date} onChange={this.store._dateChange} />
                                        <SelectComponent value={this.store.city} items={this.store.cities} onChange={this.store._cityChange} label="Район" className={classNames.select} />
                                        {/* <SelectComponent value={this.store.cabinet} items={this.store.cabinets} onChange={this.store._cabinetChange} label="Кабинет" className={classNames.select} /> */}
                                        <SelectComponent value={this.store.executor} items={this.store.executors} onChange={this.store._executorChange} label="Исполнитель" className={classNames.select} /> 
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Box mr={4} />
                                        <CheckBox label={<NewReqFlag />} checked={this.store.showOnlyNewRequests} onChange={this.store._showOnlyNewRequests} />
                                        <Box mr={4} />
                                        <CheckBox label={<CheckoutFlag />} checked={this.store.showOnlyCheckoutRequests} onChange={this.store._showOnlyCheckoutRequests} />
                                        <Box mr={4} />
                                        <CheckBox label={
                                            <Tooltip title="Отобразить заявки на исполнении">
                                                <Box mr={3} color="info.main" display="flex" edge="end" aria-label="delete">
                                                    <AccessTime />
                                                </Box>
                                            </Tooltip>
                                        } checked={this.store.showOnlyProcessRequests} onChange={this.store._showOnlyProcessRequests} />
                                        <Box mr={4} />
                                        <CheckBox label={<Tooltip title="Отобразить закрытые заявки">
                                            <Box mr={3} color="info.main" display="flex" edge="end" aria-label="delete">
                                            <CheckCircle style={{ color: "green" }} />
                                            </Box>
                                        </Tooltip>} checked={this.store.showOnlyClosedRequests} onChange={this.store._showOnlyClosedRequests} />
                                    </Box>
                                </Box>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Box>
                    <Paper>
                        <List component="nav" aria-label="mailbox folders">
                            <TableReqItem onClickClose={this.store._sendInfo} onClick={this._onReqClick} items={this.store.reqs} />
                        </List>
                    </Paper>
                    <Pagination page={this.store.page} onChange={this.store._pageChange} count={this.store.count_pages} shape="rounded" />
                    <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                    <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message={this.store.successText} />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(inject('TableRequestStore')(observer(TableRequest)));