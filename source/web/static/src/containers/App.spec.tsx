import * as React from 'react';
import { App } from './App';
import * as renderer from 'react-test-renderer';

let app:renderer.ReactTestInstance;

beforeEach(() => {
  app = renderer.create(
    <App location={{}} />
  );
});

test('App Snapshot', () => {
  expect(app.toJSON()).toMatchSnapshot();
});
