import React from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemText, Box, Typography, ListItemSecondaryAction, Chip, Tooltip, Button, CircularProgress } from '@material-ui/core'
import { CheckoutFlag, FinishedFlag, ProcessReqFlag, NewReqFlag } from '../../components/index'
class TableReqItem extends React.Component {
    // store = this.props.TableReqItemStore
    render() {
       // if (this.store.loader) {return(<React.Fragment><Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box></React.Fragment>)} else {
            if (this.props.items.length === 0) {
                return (<React.Fragment>
                    <Box p={2}>
                        <Typography color="textSecondary">{"Пусто"}</Typography>
                    </Box>
                </React.Fragment>
                )
            }
            else {
                console.log("Это из TableReqItem", this.props.items)
                return (
                    <React.Fragment>
                        {this.props.items.map(
                            (item, index) => {
                                return (
                                    <ListItem key={`${index}-table-req-item`} onClick={() => this.props.onClick(item['id'])} button divider={index !== (this.props.items.length - 1)}>
                                        <Box display="flex" flexDirection="column">
                                            <ListItemText primary={`${item["id"]}. ${item["shortname"]}`} />
                                            <Typography variant="caption" color="textSecondary">{item["date"]}</Typography>
                                        </Box>
                                        <ListItemSecondaryAction>
                                            <Box display="flex" alignItems="center">
                                                {item["checkout"] && <CheckoutFlag />}
                                                {item["status"] === "1" &&
                                                    <Box display="flex" alignItems="center">
                                                        <Box mr={3} display="flex" alignItems="center"><NewReqFlag /></Box>
                                                        <Button onClick={()=>this.props.onClickClose(item["id"])} variant="outlined" size="small" color="primary">Закрыть</Button>
                                                    </Box>
                                                }
                                                {
                                                    item["status"] === "2" && <React.Fragment>
                                                        <ProcessReqFlag item={item} />
                                                        <Button onClick={()=>this.props.onClickClose(item["id"])} variant="outlined" size="small" color="primary">Закрыть</Button>
                                                    </React.Fragment>
                                                }
                                                {item["status"] === "3" && <FinishedFlag item={item} />}
                                            </Box>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            }
                        )}
                    </React.Fragment>)
            }
       // } 
    }
}
export default inject('TableReqItemStore')(observer(TableReqItem));