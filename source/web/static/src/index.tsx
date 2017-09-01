import 'bootswatch/united/bootstrap.css';
import 'pixi';
import 'p2';
import 'phaser';
import 'slick-ui';
// Hack! :D :) >:o
// (window as any).SlickUI = (Phaser.Plugin as any).SlickUI;
// end hack
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './routers/Routes';
import store from './store/store';

const history = syncHistoryWithStore(
  hashHistory,
  store
);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { Routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);
