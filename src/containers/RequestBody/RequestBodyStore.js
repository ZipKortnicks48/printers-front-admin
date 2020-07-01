import { observable, action, decorate } from "mobx"
import {  getRequest, patchRequest } from "../../utils/requests"

class RequestBodyStore {
    loader=true
    data={}
    id=""
    errorText=""
    errorOpen=false
    history={}
    modalOpen=false
    errorOpen=false
    successOpen=false
    _errorClose=()=>{
        this.errorOpen=false
    }
    _successClose=()=>{
        this.successOpen=false
    }
    _modalClose=()=>{
        this.modalOpen=false
    }
    _modalOpen=()=>{
        this.modalOpen=true
    }
    getInfo=async ()=>{
        this.loader=true
        let url=`req/${this.id}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data},reject:this.errorCallback},token)
        this.loader=false
    }
    _closeReq = async (_id) => {
        this.loader = true
        let url = "req/admin_req_close/"
        let token = localStorage.getItem('token')
        await patchRequest(url, { id: _id }, { resolve: ()=>{this.getInfo(); this.successOpen=true}, reject: this.errorCallback }, token)
        
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
    
}
decorate(RequestBodyStore,
    {
        loader: observable,
        errorOpen: observable,
        modalOpen: observable,
        errorText:observable,
        successOpen:observable,
        errorOpen:observable,
        getInfo: action,
        _modalOpen:action,
        _errorClose:action,
        _successClose:action,
        _modalClose:action, 
        _closeReq:action,       
    })
export default new RequestBodyStore();