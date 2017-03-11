import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../containers/App';
import SimpleGame from '../containers/SimpleGame';


export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ SimpleGame }/>
  </Route>
);