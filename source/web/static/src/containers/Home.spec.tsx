import * as React from 'react';
import { Home } from './Home';
import * as renderer from 'react-test-renderer';

let home:renderer.ReactTestInstance;

beforeEach(() => {
  home = renderer.create(
    <Home />
  );
});

test('Home Snapshot', () => {
  expect(home.toJSON()).toMatchSnapshot();
});
