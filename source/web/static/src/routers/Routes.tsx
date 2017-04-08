import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../containers/App';
import SimpleGame from '../containers/SimpleGame';
import Home from '../containers/Home';


export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
    <Route path='/game' component={ SimpleGame } />
  </Route>
);
