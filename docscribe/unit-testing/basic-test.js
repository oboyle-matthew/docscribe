import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BinaryQuestion from '../src/components/BinaryQuestion';

// Basic test made! (Try changing option two to "maybe" and it will fail!)
// Snapshots basically take a "picture" of your code (serialized I think) and then in future tests
// You can compare the component to the original snapshot. "npm test -- -u" will overwrite the snapshot for a test.
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
