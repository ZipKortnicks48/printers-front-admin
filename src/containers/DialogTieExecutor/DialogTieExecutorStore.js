import { observable, action, decorate } from "mobx"
import {  patchRequest,getRequest } from "../../utils/requests"
import noop from 'lodash/noop'
import { NotificationsPaused } from "@material-ui/icons"
class DialogTieExecutorStore{
    loader=false
    errorOpen=false
    successOpen=false
    history=""
    reload=noop

    executor=""
    executors=[]
    _onExecutorChange=(e)=>{
        this.executor=e.target.value
    }

    getAdmins=async()=>{
        const token = localStorage.getItem('token')
        this.loader = true
        await getRequest("user/get_admins/", { resolve: (data) => { this.executors = data['results'];  }, reject: this.errorCallback }, token)
        this.loader = false
    }
    patchExecutor=async(id_request)=>{
        this.loader = true
        let url = "req/admin_appoint/"
        let token = localStorage.getItem('token')
        await patchRequest(url, { id: id_request,executor:this.executor }, { resolve: (data) => { this.successTiedCallback() }, reject: this.errorCallback }, token)
        this.loader = false
        this.reload()
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
    successTiedCallback=()=>{
        this.successOpen=true
    }

}

decorate(DialogTieExecutorStore,
    {
        loader:observable,
        executor:observable,
        executors:observable,

        errorOpen:observable,
        successOpen:observable,
        reload:action,
        _onExecutorChange:action,
    }
)
export default new DialogTieExecutorStore();