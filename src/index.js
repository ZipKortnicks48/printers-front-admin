import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App'
import { Provider } from "mobx-react"
import * as serviceWorker from './serviceWorker';
import AuthorisationFormStore from './containers/AuthorisationForm/AuthorisationFormStore'
import TableRequestStore from './containers/TableRequest/TableRequestStore'
import DialogCreateReqStore from './containers/DialogCreateReq/DialogCreateReqStore'
import RequestBodyStore from './containers/RequestBody/RequestBodyStore'
import CommentPanelStore from './containers/CommentPannel/CommentPanelStore'
import TableReqItemStore from './components/TableReqItem/TableReqItemStore'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
const innerTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const stores = {
  AuthorisationFormStore,
  TableRequestStore,
  DialogCreateReqStore,
  RequestBodyStore,
  CommentPanelStore,
  TableReqItemStore,
}
ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
    <ThemeProvider theme={innerTheme}>
      <App />
    </ThemeProvider>
    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
