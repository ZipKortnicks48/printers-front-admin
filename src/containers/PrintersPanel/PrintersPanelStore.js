import { observable, action, decorate } from "mobx"
import {  getRequest, postRequest } from "../../utils/requests"


class PrinterPanelStore {

    loader=true
    loaderCabinets=true
    data=[]
    cities=[]
    selectedAction=1
    city=""
    id=""
    errorText=""
    errorOpen=false
    history={}
    modalOpen=false
    problemText=""
    successOpen=false
    cityMove=""
    cabinets=[]
    cabinet=""
    count_pages=1
    limit=10
    page=1
    status=2
    searchword=""
    _cityMoveChange=(e)=>{

        this.cityMove=e.target.value
        this.getCabinets()
    }
    _searchwordChange=(e)=>{
        this.searchword=e.target.value
        
    }
    _searchClick=async (e)=>{
        this.loader=true
        let url=`printers/?offset=${(this.page - 1) * this.limit}`
        url+=`&city=0`
        this.city=0
        if(this.searchword!=="")url+=`&printer=${this.searchword}`
        if(this.status!=="")url+=`&status=${this.status}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.printerGetSuccess(data)},reject:this.errorCallback},token)
        this.loader=false
    }
    _statusChange=(e)=>{this.status=e.target.value}
    selectedPrinterObject={}
    _selectAction=(e)=>{this.cityMove="";this.selectedAction=e.target.value}
    _successClose=()=>{this.successOpen=false}
    _errorClose=()=>{this.errorOpen=false}
    _problemChange=(e)=>{this.problemText=e.target.value}
    _modalOpen=()=>{
        this.errorOpen=false
        this.cityMove="";
        this.cabinet="";
        this.problemText=this.selectedPrinterObject['status_note']
        switch(this.selectedAction){
            case 5:this.problemText="Принтер прибыл с ремонта и ожидает в ИТ-отделе.";
                    break;
            case 6:this.problemText="Принтер починен и ожидает в ИТ-отделе.";
                    break;
            case 7:this.problemText="В работе";
                    break;
        }
        this.modalOpen=true
    }
    _modalClose=()=>{this.modalOpen=false}   
    _cityChange = (e) => {
        this.city = e.target.value
        this.getPrinters()
    }
    _cabinetChange=(e)=>{
        this.cabinet=e.target.value
    }
    getPrinters=async()=>{
        this.loader=true
        let url=`printers/?offset=${(this.page - 1) * this.limit}`
        if(this.city!=="")url+=`&city=`+this.city
        if(this.city=='0'){
            if(this.searchword!=="")url+=`&printer=${this.searchword}`
            if(this.status!=="")url+=`&status=${this.status}`
        }
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.printerGetSuccess(data)},reject:this.errorCallback},token)
        this.loader=false
    }
    getInfo=async()=>{
        this.loader=true
        let url=`printers/?offset=${(this.page - 1) * this.limit}`
        let token=localStorage.getItem('token')
        await getRequest(`cities/list/`,{resolve:(data)=>{this.cities=data['results']},reject:this.errorCallback},token)
        await getRequest(url,{resolve:this.printerGetSuccess,reject:this.errorCallback},token)

        this.loader=false
    }
    printerGetSuccess=(data)=>{
        this.data= data['results']
        this.count_pages = Math.ceil(data['count'] / this.limit)
        if (this.count_pages === 0) this.count_pages = 1
    }
    getCabinets = async () => {
        this.loaderCabinets=true
        const token = localStorage.getItem('token')
        await getRequest(`cities/cabinets_by_cities/?city=${this.cityMove}`, { resolve: (data) => { this.cabinets = data;  }, reject: this.errorCallback }, token)
        this.loaderCabinets=false
    }
    sendInfo=async()=>{
        
        this.loader=true
        let url=""
        switch(this.selectedAction){
            case 1:url=`printers/move/`;
                    break;
            case 2:url=`printers/broke/`;
                    break;
            case 3:url=`printers/diagn/`;
                    break;
            case 4:url=`printers/serv/`;
                    break;
            case 5:url=`printers/wait/`;
                    this.problemText="Принтер прибыл с ремонта и ожидает в ИТ-отделе.";
                    break;
            case 6:url=`printers/servus/`;
                    this.problemText="Принтер починен и ожидает в ИТ-отделе.";
                    break;
            case 7:url=`printers/ret/`;
                    this.problemText="В работе";
                    break;
            case 8:url=`printers/del/`;
                    break;
        }
        let token=localStorage.getItem('token')
        if(this.selectedAction===1&&this.cabinet===""){
            this.errorOpen=true;
            this.errorText="Выберите кабинет";
            this.loader=false;return;
        }
        if(this.selectedAction!==1){await postRequest(url,{"printer":String(this.selectedPrinterObject["id"]),"comment":this.problemText},{resolve:this.successBrokeCallback,reject:this.errorCallback},token)}
        else {await postRequest(url,{"printer":String(this.selectedPrinterObject["id"]),"comment":this.problemText,"cabinet":this.cabinet},{resolve:this.successBrokeCallback,reject:this.errorCallback},token)}
    }
    successBrokeCallback=async()=>{
        this.modalOpen=false
        this.successText="Отправлено!"
        this.selectedAction=1
        this.cityMove=""
        this.cabinet=""
        this.city=""
        await this.getInfo()
        
    }
    _pageChange = (event, value) => {
        this.page = value
        this.getPrinters()
    }
    errorCallback=(errorMessage,code)=>{
        this.loader=false
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        console.log("PADENIE")
        this.errorText = `Ошибка ${code}`
        this.errorOpen = true
    }
}
decorate(PrinterPanelStore,
    {
        loader: observable,
        errorText:observable,
        errorOpen: observable,
        successOpen:observable,
        modalOpen:observable,
        problemText:observable,
        selectedPrinterObject:observable,
        city:observable,
        cityMove:observable,
        selectedAction:observable,
        cabinet:observable,
        loaderCabinets:observable,
        count_pages:observable,
        page:observable,
        status:observable,
        searchword:observable,
        _searchClick:action,
        _searchwordChange:action,
        _statusChange:action,
        _pageChange:action,
        _selectAction:action,
        _onCityChange:action,
        _problemChange:action,
        getInfo: action,
        _cityMove:action,
        _modalClose:action,
        _modalOpen:action,
        _errorClose:action,
        _successClose:action,
    })
export default new PrinterPanelStore();