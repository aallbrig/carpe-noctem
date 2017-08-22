import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../containers/App';
import Home from '../containers/Home';
import SimpleGame from '../containers/SimpleGame';
import MoonShooter from '../containers/MoonShooter';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
    <Route path='/simple_game' component={ SimpleGame } />
    <Route path='/moon_shooter' component={ MoonShooter } />
  </Route>
);
