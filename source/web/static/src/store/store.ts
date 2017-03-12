import { createStore } from 'redux';
import { default as reducers } from '../reducers';

export const store = createStore(reducers);

export default store;