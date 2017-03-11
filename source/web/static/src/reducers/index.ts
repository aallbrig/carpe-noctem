import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import SimpleGameReducer from './SimpleGame';
export default combineReducers({
  simpleGame: SimpleGameReducer,
  routing: routerReducer
});