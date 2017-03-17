import { constants } from '../../constants';
import { createAction } from 'redux-actions';

export const incrementCounter = createAction(constants.INCREMENT_COUNTER);

export const decrementCounter = createAction(constants.DECREMENT_COUNTER);

export const logoutUser = createAction(constants.LOGOUT_USER);

export const combinedActions = {
  incrementCounter,
  decrementCounter,
  logoutUser
};

export default combinedActions;
