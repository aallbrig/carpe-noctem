import { createStore } from 'redux';
import { default as reducers } from '../reducers';
const reduxResponsive = require('redux-responsive');
const { calculateResponsiveState } = reduxResponsive;
import { debounce } from 'lodash';

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
export const store = createStore(
  reducers,
  devTools && devTools()
);

store.dispatch(calculateResponsiveState(window));
const onResize = debounce((): void => store.dispatch(calculateResponsiveState(window)), 1000);
window.addEventListener('resize', onResize);

export default store;
