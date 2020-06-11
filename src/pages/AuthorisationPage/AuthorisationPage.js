import React from "react"
import {AuthorisationForm} from '../../containers/index'
export default class AuthorisationPage extends React.Component {
    
    componentDidMount=()=>{
        if(localStorage.getItem('token')!==null){
            this.props.history.push("requests")
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <AuthorisationForm/>
            </React.Fragment>
        )
    }

}

