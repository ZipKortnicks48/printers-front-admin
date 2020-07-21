import { observable, action, decorate } from "mobx"
import { getRequest, patchRequest } from "../../utils/requests"
export class TableRequestStore {
    searchword = "";
    date = null;
    city = "";
    cabinet = "";
    executor = "";

    cabinets = [];
    cities = [];
    executors = [];

    showOnlyClosedRequests = false;
    showOnlyNewRequests = false;
    showOnlyProcessRequests = false;
    showOnlyCheckoutRequests = false;

    tableLoader = true;
    reqs = [];
    history = {};
    errorText = "";
    errorOpen = false;
    successText = "";
    successOpen = false;
    page = 1;
    limit = 10
    count_pages = 1;
    _searchwordChange = (e) => {
        this.searchword = e.target.value
    }
    _pageChange = (event, value) => {
        this.page = value
        this.getFirstData()
    }
    _executorChange = (e) => {
        this.executor = e.target.value
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
        let url = `req/admin_view/?offset=${(this.page - 1) * this.limit}&`
        if (this.searchword !== "") url = url + "search=" + this.searchword + "&"
        if (this.date !== null) url = url + "date=" + this.date + "&"
        // if (this.cabinet !== "") url = url + "cabinet=" + this.cabinet + "&"
        if (this.city !== "") url = url + "city=" + this.city + "&"
        if (this.executor !== "") url = url + "executor=" + this.executor + "&"
        if (this.showOnlyClosedRequests) url = url + "only_finished=true&"
        if (this.showOnlyNewRequests) url = url + "only_new=true&"
        if (this.showOnlyProcessRequests) url = url + "only_process=true&"
        if (this.showOnlyCheckoutRequests) url = url + "only_checkout=true&"
        const token = localStorage.getItem('token')
        await getRequest(url, { resolve: this.successReqCallback, reject: this.errorCallback }, token)
        this.tableLoader = false
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
        } else { this.date = date }
    }

    _showOnlyClosedRequests = (e) => {
        this.showOnlyClosedRequests = e.target.checked
    }
    _showOnlyNewRequests = (e) => {
        this.showOnlyNewRequests = e.target.checked
    }
    _showOnlyProcessRequests = (e) => {
        this.showOnlyProcessRequests = e.target.checked
    }
    _showOnlyCheckoutRequests = (e) => {
        this.showOnlyCheckoutRequests = e.target.checked
    }

    _errorClose = () => {
        this.errorOpen = false;
    }
    _successClose = () => {
        this.successOpen = false;
    }
    getFirstData = async () => {
        console.log("Получение заявок, районов и исполнителей")
        const token = localStorage.getItem('token')
        this.tableLoader = true
        await getRequest(`cities/list/`, { resolve: this.successCitiesCallback, reject: this.errorCallback }, token)
        await getRequest(`user/get_admins/`, { resolve: this.successAdminsCallback, reject: this.errorCallback }, token)
        await getRequest(`req/admin_view/?offset=${(this.page - 1) * this.limit}`, { resolve: this.successReqCallback, reject: this.errorCallback }, token)
        this.tableLoader=false
    }
    _sendInfo = async (_id) => {
        this.tableLoader = true
        let url = "req/admin_req_close/"
        let token = localStorage.getItem('token')
        await patchRequest(url, { id: _id }, { resolve: (data) => { this.successClosedCallback() }, reject: this.errorCallback }, token)
        this.tableLoader = false
    }
    successReqCallback = async (data) => {
        console.log("Заявки получены", data)
        this.reqs = data['results']
        this.count_pages = Math.ceil(data['count'] / this.limit)
        if (this.count_pages === 0) this.count_pages = 1
        console.log("Перещелкивание на фолс")
        this.tableLoader = false
    }
    successCitiesCallback = (data) => {
        console.log("Комплексы получены")
        this.cities = data['results']
    }
    successAdminsCallback = (data) => {
        console.log("Список исполнителей получен")
        this.executors = data['results']
    }
    successClosedCallback = async () => {
        await this.getFirstData()
        this.tableLoader = false
        this.successText = "Заявка успешно закрыта."
        this.successOpen = true
        
    }
    errorCallback = (errorMessage, code) => {
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.tableLoader = true
            this.history.replace("/")
        }
        this.tableLoader = false
        this.errorText = `Ошибка ${code} ${errorMessage['detail']}`
        this.errorOpen = true
    }

}
decorate(TableRequestStore,
    {
        _searchwordChange: action,
        _dateChange: action,
        _citiesChange: action,
        _showOnlyClosedRequests: action,
        _showOnlyNewRequests: action,
        _showOnlyProcessRequests: action,
        _showOnlyChecoutRequests: action,
        _onSearchClick: action,
        _errorClose: action,
        _pageChange: action,
        _sendInfo: action,
        _successClose: action,
        tableLoader: observable,
        searchword: observable,
        date: observable,
        city:observable,
        executor:observable,
        errorOpen: observable,
        errorText: observable,
        successText: observable,
        successOpen: observable,
        showOnlyClosedRequests: observable,
        showOnlyNewRequests: observable,
        showOnlyProcessRequests: observable,
        showOnlyCheckoutRequests: observable,   
        page: observable,
        cities:observable,
        executors:observable,

    }
)

export default new TableRequestStore();