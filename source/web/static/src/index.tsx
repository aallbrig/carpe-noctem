import 'bootswatch/united/bootstrap.css';
import 'pixi';
import 'p2';
import 'phaser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './routers/Routes';
import store from './store/store';
// TODO: Resolve situation where History !== History.History, even though they both reference the same type..?
const history = syncHistoryWithStore(
  hashHistory,
  store
);

const appDiv = document.createElement('div');
appDiv.id = 'app';
document.getElementsByTagName('body')[0].appendChild(appDiv);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { Routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);
