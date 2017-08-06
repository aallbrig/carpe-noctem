import * as React from 'react';
import { HomeContainer } from './Home';
import * as renderer from 'react-test-renderer';

let homeContainer:renderer.ReactTestInstance;

beforeEach(() => {
  homeContainer = renderer.create(
    <HomeContainer />
  );
});

test('Home Snapshot', () => {
  expect(homeContainer.toJSON()).toMatchSnapshot();
});
