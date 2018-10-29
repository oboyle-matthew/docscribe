import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { CheckBox } from 'react-native-elements';
import BinaryQuestion from '../src/components/BinaryQuestion';

// Basic test made! (Try changing option two to "maybe" and it will fail!)
// Snapshots basically take a "picture" of your code (serialized I think) and then in future tests
// You can compare the component to the original snapshot. "npm test -- -u" will overwrite the snapshot for a test.
describe('<BinaryQuestion/>', () => {
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

  it('Modifies values upon selection', () => {
    const inst = renderer.create(
      <BinaryQuestion
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
        style={{ marginBottom: '20%' }}
      />
    );
    const checkBoxes = inst.root.findAllByType(CheckBox);

    for (const box of checkBoxes) {
      const one = inst.root.instance.state.oneChecked;
      box.props.onPress();
      expect(inst.root.instance.state.oneChecked).not.toBe(one);
    }
  });
});
