import { combineReducers, Reducer } from 'redux';
import { routerReducer, IRouterState } from 'react-router-redux';
import { default as SimpleGameReducer, ISimpleGameState } from './SimpleGame';

export interface IRootReducerState {
  simpleGame: ISimpleGameState,
  routing: IRouterState
}
export const rootReducer = combineReducers({
  simpleGame: SimpleGameReducer,
  routing: routerReducer
}) as Reducer<IRootReducerState>;

export default rootReducer as Reducer<IRootReducerState>;