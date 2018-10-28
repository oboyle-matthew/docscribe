import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Pain from '../src/Pain';

it('renders correctly', () => {
  const nav = { navigate: () => {} };
  const pain = renderer.create(<Pain navigation={nav} />).toJSON();
  expect(pain).toMatchSnapshot();
});
