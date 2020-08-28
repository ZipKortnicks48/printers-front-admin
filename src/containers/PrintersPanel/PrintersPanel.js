import React from 'react'
import { inject, observer } from 'mobx-react'
import {
    CircularProgress, ListItem, TextField, Dialog,
    DialogContent, DialogTitle, DialogActions, ListItemSecondaryAction, Box, Typography, Button, DialogContentText,
} from '@material-ui/core'
import { Pagination } from "@material-ui/lab"
import { MessageSnackbar, SelectComponent,RequestSearchField } from "../../components/index"
class PrinterPanel extends React.Component {
    store = this.props.PrinterPanelStore
    componentDidMount = () => {
        //запрос принтера и доступных картриджей для каждого принтера, загрузка стора, загрузка истории
        this.store.history = this.props.history
        this.store.getInfo()
    }
    actions = [
        {
            id: 1,
            name: "1 - Перемещение принтера"
        },
        {
            id: 2,
            name: "2 - Поломка в комплексе"
        },
        {
            id: 3,
            name: "3 - Принятие в диагностику"
        },
        {
            id: 4,
            name: "4 - Сдача в ремонт"
        },
        {
            id: 5,
            name: "5 - Принятие из ремонта в ОГУП"
        },
        {
            id: 6,
            name: "6 - Самостоятельный ремонт"
        },
        {
            id: 7,
            name: "7 - Возвращение в комплекс после ремонта"
        },
        {
            id: 8,
            name: "8 - Списание принтера"
        }
    ]
    render() {

        if (this.store.loader) { return (<Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>) } else return (
            <React.Fragment>
                <Box display="flex" justifyContent="space-between" >
                    <SelectComponent items={this.store.cities} value={this.store.city} onChange={this.store._cityChange} label="Район" />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box><SelectComponent items={[{ id: "2", name: 'Сломан в комплексе' }, { id: "3", name: 'Диагностика' }, { id: "4", name: 'На ремонте' }, { id: "5", name: 'Ожидает отправки' }]}
                            value={this.store.status} onChange={this.store._statusChange} label="Район"
                            label="Cтатус"
                        /></Box>
                       <Box mt={2} ml={1} display="flex"><RequestSearchField
                                            onClick={this.store._searchClick}
                                            onChange={this.store._searchwordChange}
                                            value={this.store.searchword}
                                            placeholder="Введите модель или ID принтера" /></Box> 
                    </Box>
                </Box>
                {(this.store.data.length !== 0) && this.store.data.map((item, index) => <React.Fragment key={`index-printer-item-${index}`}>
                    <ListItem button divider={index !== (this.store.data.length - 1)}>
                        <Box color="text.primary" display="flex" flexDirection="column">
                            <Box display="flex" alignItems="center"><Box mr={1} fontSize={16}> {item["printer"]["producer"]["name"] + " " + item["printer"]["name"]}</Box>
                                {item['status'] === 1 && <Box color="#2196f3" fontSize={16}> • Работает</Box>}
                                {item['status'] === 2 && <Box color="#e63946" fontSize={16}> • Сломан</Box>}
                                {item['status'] === 3 && <Box color="#457b9d" fontSize={16}> • Диагностика</Box>}
                                {item['status'] === 4 && <Box color="#fca311" fontSize={16}> • Ремонт</Box>}
                                {item['status'] === 5 && <Box color="#02c39a" fontSize={16}> • Прибыл из ремонта. Ожидает</Box>}
                                {item['status'] === 6 && <Box color="#d8e2dc" fontSize={16}> • Списан. Недоступен</Box>}
                            </Box>
                            <Typography variant="caption" color="textSecondary">{`ID:${item["id"]}`}</Typography>
                            <Typography variant="caption" color="textSecondary">{`Статус:${item["status_note"]}`}</Typography>
                            <Typography variant="caption" color="textSecondary">{`Район:${item['cabinet']['city']['name']}, Кабинет:${item["cabinet"]["name"]}`}</Typography>
                            <Box display="flex" alignItems="center"><Typography variant="caption" color="textSecondary">{`Заметка:${item["note"]}`}  </Typography></Box>
                        </Box>
                        <ListItemSecondaryAction>
                            <Box display="flex" justifyContent="flex-end" flexDirection="column">
                                <Box><SelectComponent items={this.actions} defaultValue={1} onChange={this.store._selectAction} label="Выберите действие" /></Box>
                                <Box><Button onClick={() => { this.store.selectedPrinterObject = item; this.store._modalOpen(); }} variant="outlined" size="small" >Выполнить</Button></Box>
                            </Box>
                        </ListItemSecondaryAction>
                    </ListItem>
                </React.Fragment>)
                }
                {(this.store.data.length === 0) && <Box mt={3}><Typography color="textSecondary">Пусто</Typography></Box>}
                <Pagination page={this.store.page} onChange={this.store._pageChange} count={this.store.count_pages} shape="rounded" />
                <Dialog open={this.store.modalOpen} onClose={this.store._modalClose}>
                    <Box>
                        <DialogTitle>Комментарий к статусу принтера</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Введите комментарий</DialogContentText>
                            <TextField
                                fullWidth
                                label="Комментарий"
                                multiline
                                rows={6}
                                variant="outlined"
                                value={this.store.problemText}
                                onChange={this.store._problemChange}
                            />
                            {this.store.selectedAction === 1 && <Box>
                                <SelectComponent items={this.store.cities} value={this.store.cityMove} onChange={this.store._cityMoveChange} label="Район" />
                            </Box>}
                            {this.store.cityMove !== "" &&
                                (this.store.loaderCabinets ? <CircularProgress /> : <SelectComponent items={this.store.cabinets} value={this.store.cabinet} onChange={this.store._cabinetChange} label="Кабинет" />)

                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.store.sendInfo} >Отправить</Button>
                            <Button onClick={this.store._modalClose}>Отмена</Button>
                        </DialogActions>
                        <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                        <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message={this.store.successText} />
                    </Box>
                </Dialog>
            </React.Fragment>
        )
    }
}
export default inject('PrinterPanelStore', 'TableRequestStore')(observer(PrinterPanel));