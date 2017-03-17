import { createStore, applyMiddleware } from 'redux';
import { default as reducers } from '../reducers';
// TODO: Resolve 'redux-responsive' issue below
import { calculateResponsiveState } from 'redux-responsive';
import { debounce } from 'lodash';

export const store = createStore(
  reducers,
  // TODO: Find out how to have both compile time and run time tools
  // import { composeWithDevTools } from 'redux-devtools-extension';
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(calculateResponsiveState(window));
const onResize = debounce(() => store.dispatch(calculateResponsiveState(window)), 1000);
window.addEventListener('resize', onResize);

export default store;