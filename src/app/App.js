import React from 'react';
import classNames from './app.module.css';
import { AuthorisationPage, RequestListPage, RequestPage } from '../pages';
import { Route, Switch } from "react-router-dom";
import pathes from '../utils/routing'
import {Container} from '@material-ui/core'

class App extends React.Component {
  render() {
    return (
      <div className={classNames.appBody} >
        <Container fixed style={{paddingTop:"10px",height:"100vh"}}> 
          <Switch>
            <Route exact path={pathes["authPath"]} component={AuthorisationPage} />
            <Route exact path={pathes["listRequestsPath"]} component={RequestListPage} />
            <Route exact path={pathes["requestPath"]} component={RequestPage}/>
          </Switch>
          </Container>  
      </div>
    );
  }
}

export default App;
