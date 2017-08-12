import * as React from 'react';
import { Navigation } from './Navigation';
import * as renderer from 'react-test-renderer';

let navigation:renderer.ReactTestInstance;

beforeEach(() => {
  navigation = renderer.create(<Navigation />);
});

test('Navigation Snapshot', () => {
  expect(navigation.toJSON()).toMatchSnapshot();
});
