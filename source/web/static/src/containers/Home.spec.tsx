import * as React from 'react';
import { HomeContainer } from './Home';
import { connect } from 'react-redux'
import * as renderer from 'react-test-renderer';

test('Home Container', () => {
  const component = renderer.create(
    <HomeContainer />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});