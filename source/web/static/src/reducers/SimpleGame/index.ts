import constants from './constants';
import * as SimpleGameActions from '../../actions/SimpleGame'
import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

export interface ISimpleGameState {
  count: Number;
  height: Number;
  width: Number;
}
const INITIAL_STATE = Record({
  count: 0,
  height: 540,
  width: 540
} as ISimpleGameState)();

export default handleActions({
  [constants.INCREMENT_COUNTER]: (state, action) => state.update('count', (value) => value + 1),
  [constants.DECREMENT_COUNTER]: (state, action) => state.update('count', (value) => value - 1),
  [constants.LOGOUT_USER]: (state, action) => state.merge(INITIAL_STATE)
}, INITIAL_STATE);
