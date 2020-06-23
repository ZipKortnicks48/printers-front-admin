import { observable, action, decorate } from "mobx"
import { postRequest, getRequest } from "../../utils/requests"

class DialogCreateReqStore {

    shortname = ""
    description = ""
    cabinet = ""
    deadline = null
    checkout = false
    loader = false
    cabinets = []
    errorOpen = false
    successOpen = false
    errorText = ""
    history = {}
    phone={}
    getCabinets = async () => {
        const token = localStorage.getItem('token')
        this.loader = true
        await getRequest("cities/cabinets/", { resolve: (data) => { this.cabinets = data;  }, reject: this.errorCallback }, token)
        this.loader = false
    }
    _onNameChange = (e) => { this.shortname = e.target.value;  }
    _onDescChange = (e) => { this.description = e.target.value;  }
    _onCabinetChange = (e) => { this.cabinet = e.target.value;  }
    _onDeadlineChange = (date) => {
        if (date !== null) {
            this.deadline = date
            let month = '' + (date.getMonth() + 1)
            let day = '' + date.getDate()
            let year = date.getFullYear()
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            this.deadline = `${year + "-" + month + "-" + day}`
        } else { this.deadline = date }
        
    }
    _onCheckoutChange = (e) => { this.checkout = e.target.checked;  }
    _onPhoneChange=(e)=>{this.phone = e.target.value; }
    _errorClose = () => {
        this.errorOpen = false
    }
    _successClose = () => {
        this.successOpen = false
    }
    errorCallback = (errorMessage, code) => {
 
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        this.errorText = `Ошибка ${code} ${errorMessage['detail']}`
        this.errorOpen = true
    }
    _responseClick = async () => {
        let data = {
            'shortname': this.shortname,
            'description': this.description,
            'cabinet': this.cabinet,
            'deadline': this.deadline,
            'checkout': this.checkout,
            'phone':this.phone,
        }
        const token = localStorage.getItem('token')
        this.loader = true
        const url = 'req/'
        await postRequest(url, data, { resolve: () => { this.successOpen = true }, reject: this.errorCallback }, token)
        this.loader = false
    }
}
decorate(DialogCreateReqStore,
    {
        shortname: observable,
        description: observable,
        cabinet: observable,
        deadline: observable,
        loader: observable,
        cabinets: observable,
        errorOpen: observable,
        errorText: observable,
        successOpen: observable,
        phone:observable,
        _successClose: action,
        _errorClose: action,
        errorCallback: action,
        _responseClick: action,
        _onCabinetChange: action,
        _onPhoneChange:action
    }
)
export default new DialogCreateReqStore();