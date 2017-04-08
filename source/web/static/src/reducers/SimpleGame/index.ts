import { Record } from 'immutable';
import { handleActions } from 'redux-actions';
import { default as constants } from  '../../constants/SimpleGame';

export interface ISimpleGameState {
  count: number;
}
const INITIAL_STATE = Record({
  count: 0
} as ISimpleGameState)();

export default handleActions(
  {
    [constants.INCREMENT_COUNTER]: (state) => state.update('count', (value) => value + 1),
    [constants.DECREMENT_COUNTER]: (state) => state.update('count', (value) => value - 1),
    [constants.LOGOUT_USER]: (state) => state.merge(INITIAL_STATE)
  }, 
  INITIAL_STATE
);
