import { observable, action, decorate } from "mobx"
import {  patchRequest } from "../../utils/requests"

class TableReqItemStore{
    loader=false
    errorText=""
    errorOpen=false
    successOpen=false
    successText=""
    sendInfo=async (_id)=>{
        this.loader=true
        let url="req/admin_req_close/"
        let token=localStorage.getItem('token')
        await patchRequest(url,{id:_id},{resolve:(data)=>{console.log(`Заявка ${_id} успешно закрыта`)},reject:this.errorCallback},token)
        this.loader=false
    }
    errorCallback=(errorMessage,code)=>{
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        console.log('Ошибка закрытия заявки')
        this.errorText = `Ошибка ${code} ${errorMessage['detail']}`
        this.errorOpen = true
        this.loader=false
    }
    
}
decorate(TableReqItemStore,
    {
    loader:observable,
    errorOpen:observable,
    successOpen:observable,
    }
)
export default new TableReqItemStore();