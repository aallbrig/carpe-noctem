import React from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import Reducers from '../../reducers/index'
console.log('Reducers');
console.log(Reducers);
import PhaserRunner from '../presentation/PhaserRunner'
const DemoLevel = connect(
  (state) => ({
    game: state.game
  }),
  (dispatch) => ({})
)(PhaserRunner);
const store = createStore(Reducers.DemoLevel);

module.exports = () => (
  <Provider store={store}>
    <DemoLevel />
  </Provider>
);
