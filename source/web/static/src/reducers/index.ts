import { combineReducers, Reducer } from 'redux';
import { routerReducer, IRouterState } from 'react-router-redux';
// TODO: Ignore below typescript error
import { createResponsiveStateReducer, calculateResponsiveState } from 'redux-responsive';
import { default as SimpleGameReducer, ISimpleGameState } from './SimpleGame';

// TODO: Create redux-responsive type mapping and release onto NPM
export interface IReduxResponsiveState {
  width: number,
  height: number,
  mediaType: string,
  orientation: string | null,
  breakpoints: {
    extraSmall: number,
    small: number,
    medium: number,
    large: number,
    extraLarge: number,
    infinity: number  // Why track this value?
  },
  is: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean
  }
  greaterThan: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean
  },
  lessThan: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean
  }
};

export interface IRootReducerState {
  simpleGame: ISimpleGameState,
  routing: IRouterState,
  responsive: IReduxResponsiveState
};

const responsiveReducer:Reducer<IReduxResponsiveState> = createResponsiveStateReducer({
  extraSmall: 480,
  small: 768,
  medium: 992,
  large: 1200,
  extraLarge: 1200,
} as {
  extraSmall: number,
  small: number,
  medium: number,
  large: number,
  extraLarge: number
}, {
  extraFields: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    media: window.matchMedia
  }),
});

export const rootReducer = combineReducers({
  simpleGame: SimpleGameReducer,
  routing: routerReducer,
  responsive: responsiveReducer
});

export default rootReducer as Reducer<IRootReducerState>;