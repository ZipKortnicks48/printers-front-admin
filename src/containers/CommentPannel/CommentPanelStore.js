import { observable, action, decorate } from "mobx"
import { postRequest, getRequest } from "../../utils/requests"

class CommentPanelStore {
    loader=true
    data={}
    id=""
    errorText=""
    errorOpen=false
    message=""
    getInfo=async ()=>{
        this.loader=true
        let url=`req/comments/?req=${this.id}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data},reject:this.errorCallback},token)
        this.loader=false
    }
    _errorClose=()=>{
        this.errorOpen=false
    }
    sendMessage=async ()=>{
        this.loader=true
        let token=localStorage.getItem('token')
        let url=`req/comments/`
        await postRequest(url,{text:this.message,req:this.id},{resolve:async()=>{await this.getInfo();this.loader=false},reject:this.errorCallback},token)
    }
    _messageChange=event=>{
        this.message=event.target.value
    }

    errorCallback = (errorMessage, code) => {
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        this.errorText = `Ошибка ${code} ${errorMessage['detail']}`
        this.errorOpen = true
        this.loader=false
    }

}
decorate(CommentPanelStore,
    {
        loader: observable,
        errorOpen: observable,
        message: observable,
        getInfo: action,
        sendMessage: action,
    })
export default new CommentPanelStore();