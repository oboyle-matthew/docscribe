import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BinaryQuestion from '../src/components/BinaryQuestion';

// Basic test made! (Try changing option two to "maybe" and it will fail!)
it('renders correctly', () => {
  const pain = renderer
    .create(
      <BinaryQuestion
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
        style={{ marginBottom: '20%' }}
      />
    )
    .toJSON();
  expect(pain).toMatchSnapshot();
});
