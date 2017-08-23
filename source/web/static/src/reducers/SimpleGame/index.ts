import { handleActions } from 'redux-actions';
import constants from  '../../constants/SimpleGame';
export interface ISimpleGameState {
  count: number;
}
const INITIAL_STATE: ISimpleGameState = {
  count: 0
};

export default handleActions(
  {
    [constants.INCREMENT_COUNTER]: (state) => ({...state, count: state.count + 1}),
    [constants.DECREMENT_COUNTER]: (state) => ({...state, count: state.count - 1}),
    [constants.LOGOUT_USER]: () => INITIAL_STATE
  },
  INITIAL_STATE
);
