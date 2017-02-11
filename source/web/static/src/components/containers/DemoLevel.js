import React from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import { DemoLevel } from '../../reducers'
import PhaserRunner from '../presentation/PhaserRunner'
const DemoLevelContainer = connect(
  (state) => ({
    game: state.game
  }),
  (dispatch) => ({})
)(PhaserRunner);
const store = createStore(DemoLevel);

module.exports = () => (
  <Provider store={store}>
    <DemoLevelContainer />
  </Provider>
);
