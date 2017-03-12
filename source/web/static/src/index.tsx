// import 'bootstrap/less/bootstrap.less';
import 'bootswatch/united/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Routes from './routers/Routes';
import store from './store/store';
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { Routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);