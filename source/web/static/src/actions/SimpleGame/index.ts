import { constants } from '../../reducers/SimpleGame/constants';
import { createAction } from 'redux-actions';

constants.INCREMENT_COUNTER;
constants.DECREMENT_COUNTER;
constants.LOGOUT_USER;

export const incrementCounter = createAction(constants.INCREMENT_COUNTER);

export const decrementCounter = createAction(constants.DECREMENT_COUNTER);

export const logoutUser = createAction(constants.LOGOUT_USER);

export default {
  incrementCounter,
  decrementCounter,
  logoutUser
};