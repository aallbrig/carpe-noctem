import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
const reduxResponsive = require('redux-responsive');
const { createResponsiveStateReducer } = reduxResponsive;
import { default as SimpleGameReducer, ISimpleGameState } from './SimpleGame';

// TODO: Create redux-responsive type mapping and release onto NPM
export interface IReduxResponsiveState {
  width: number;
  height: number;
  mediaType: string;
  orientation: string | null;
  breakpoints: {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    infinity: number;  // Why track this value?
  };
  is: {
    extraSmall: boolean;
    small: boolean;
    medium: boolean;
    large: boolean;
    extraLarge: boolean
  };
  greaterThan: {
    extraSmall: boolean;
    small: boolean;
    medium: boolean;
    large: boolean;
    extraLarge: boolean
  };
  lessThan: {
    extraSmall: boolean;
    small: boolean;
    medium: boolean;
    large: boolean;
    extraLarge: boolean;
  };
};

const responsiveReducer:Reducer<IReduxResponsiveState> = createResponsiveStateReducer(
  {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
    extraLarge: 1200,
  } as {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  },
  {
    extraFields: () => ({
      width: window.innerWidth,
      height: window.innerHeight,
      media: window.matchMedia
    }),
  }
);

export interface IRootReducerState {
  simpleGame: ISimpleGameState;
  routing: RouterState;
  responsive: IReduxResponsiveState;
};

export const rootReducer:Reducer<IRootReducerState> = combineReducers({
  simpleGame: SimpleGameReducer,
  routing: routerReducer,
  responsive: responsiveReducer
});

export default rootReducer;
