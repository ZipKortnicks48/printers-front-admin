import { observable,  action, decorate } from "mobx"
import { getRequest, patchRequest } from "../../utils/requests"
export class TableRequestStore {
    searchword = "";
    date = null;
    city="";
    cabinet = "";
    executor="";

    cabinets = [];
    cities=[];
    executors=[];

    showOnlyClosedRequests = false;
    showOnlyNewRequests = false;
    showOnlyProcessRequests = false;
    showOnlyCheckoutRequests=false;

    tableLoader = true;
    reqs = [];
    history={};
    errorText="";
    errorOpen=false;
    successText="";
    successOpen=false;
    page=1;
    limit=10
    count_pages=1;
    _searchwordChange = (e) => {
        this.searchword = e.target.value
    }
    _pageChange=(event,value)=>{
        this.page=value
        this.getCabinets()
    }
    _executorChange=(e)=>{
        this.executor=e.target.value
    }
    _cabinetChange = (e) => {
        this.cabinet = e.target.value
    }
    _cityChange = (e) => {
        this.city = e.target.value
    }
    _filterClick = async () => {
        this.tableLoader = true
        this.reqs = []
        let url = `req/?offset=${(this.page-1)*this.limit}&`
        if (this.searchword !== "") url = url + "search=" + this.searchword + "&"
        if (this.date !== null) url = url + "date=" + this.date + "&"
        if (this.cabinet !== "") url = url + "cabinet=" + this.cabinet + "&"
        if (this.showClosedRequests) url=url+"status="+!this.showOnlyClosedRequests+"&"
        const token = localStorage.getItem('token')
        await getRequest(url, { resolve: this.successReqCallback, reject: this.errorCallback }, token)
        this.tableLoader=false
    }
    _dateChange = (date) => {
        if (date !== null) {
        this.date = date
            let month = '' + (date.getMonth() + 1)
            let day = '' + date.getDate()
            let year = date.getFullYear()
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            this.date = `${year + "-" + month + "-" + day}`
        }else{this.date=date}
    }
    
    _showClosedRequests = (e) => {
        this.showClosedRequests = e.target.checked
    }
    _errorClose=()=>{
        this.errorOpen=false;
    }
    _successClose=()=>{
        this.successOpen=false;
        
    }
    getCabinets = async () => {
        console.log("Получение заявок и кабинетов")
        const token = localStorage.getItem('token')
        this.tableLoader = true
        await getRequest("cities/cabinets/", { resolve: this.successCabinetCallback, reject: this.errorCallback }, token)
        await getRequest(`req/?offset=${(this.page-1)*this.limit}`, { resolve: this.successReqCallback, reject: this.errorCallback }, token)
    }
    _sendInfo=async (_id)=>{
        this.tableLoader=true
        let url="req/admin_req_close/"
        let token=localStorage.getItem('token')
        await patchRequest(url,{id:_id},{resolve:(data)=>{this.successClosedCallback()},reject:this.errorCallback},token)
        this.tableLoader=false
    }
    successReqCallback = async (data) => {
        console.log("Заявки получены",data)
        this.reqs = data['results']
        this.count_pages=Math.ceil(data['count']/this.limit)
        if(this.count_pages===0) this.count_pages=1
        console.log("Перещелкивание на фолс")
        this.tableLoader=false
    }
    successCabinetCallback = (data) => {
        console.log("Кабинеты получены")
        this.cabinets = data
    }
    successClosedCallback=async()=>{
        await this.getCabinets()
        this.tableLoader=false
        this.successText="Заявка успешно закрыта."
        this.successOpen = true
    }
    errorCallback = (errorMessage, code) => {
        if(code===401){
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.tableLoader=true
            this.history.replace("/") 
        }
        this.tableLoader=false
        this.errorText=`Ошибка ${code} ${errorMessage['detail']}`
        this.errorOpen = true
    }

}
decorate(TableRequestStore,
    {
        _searchwordChange: action,
        _dateChange: action,
        _cabinetChange: action,
        _showClosedRequests: action,
        _onSearchClick: action,
        _errorClose:action,
        _pageChange:action,
        _sendInfo:action,
        _successClose:action,
        tableLoader: observable,
        searchword: observable,
        date: observable,
        errorOpen:observable,
        errorText:observable,
        successText:observable,
        successOpen:observable,
        showClosedRequests:observable,
        cabinet:observable,
        page:observable,
        
    }
)

export default new TableRequestStore();