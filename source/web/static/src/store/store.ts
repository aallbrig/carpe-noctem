import { createStore, applyMiddleware } from 'redux';
import { default as reducers } from '../reducers';
const reduxResponsive = require('redux-responsive');
const { calculateResponsiveState } = reduxResponsive;
import { debounce } from 'lodash';

export const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(calculateResponsiveState(window));
const onResize = debounce(() => store.dispatch(calculateResponsiveState(window)), 1000);
window.addEventListener('resize', onResize);

export default store;