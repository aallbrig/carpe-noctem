import * as React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from '../containers/App';
import Home from '../containers/Home';
import FlexboxCenter from '../components/FlexboxCenter';
import SimpleGame from '../containers/SimpleGame';
import MoonShooter from '../containers/MoonShooter';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
    <Route path='/simple_game' component={ (props) => (
      <FlexboxCenter>
        <SimpleGame { ...props } />
      </FlexboxCenter>
    ) } />
    <Route path='/moon_shooter' component={ (props) => (
      <FlexboxCenter>
        <MoonShooter { ...props } />
      </FlexboxCenter>
    ) } />
  </Route>
);
