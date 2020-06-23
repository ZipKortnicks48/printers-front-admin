import { observable, action, decorate } from "mobx"
import {  getRequest } from "../../utils/requests"

class RequestBodyStore {
    loader=true
    data={}
    id=""
    errorText=""
    errorOpen=false
    history={}
    getInfo=async ()=>{
        this.loader=true
        let url=`req/${this.id}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data},reject:this.errorCallback},token)
        this.loader=false
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
        getInfo: action,
        
    })
export default new RequestBodyStore();