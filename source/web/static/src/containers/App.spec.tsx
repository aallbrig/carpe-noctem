import * as React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from '../store/store'
import * as renderer from 'react-test-renderer';

let app:renderer.ReactTestInstance;

beforeEach(() => {
  app = renderer.create(
    <Provider store={ store }>
        <App children={null} />
    </Provider>
  );
});

test('App Snapshot', () => {
  expect(app.toJSON()).toMatchSnapshot();
});
