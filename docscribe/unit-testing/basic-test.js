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

  // If you want details on this I googled 'react test renderer docs' and used that as a starting point.
  // This basically iterates through each Checkbox and presses it, then checks to see if the boolean values change
  // I verified it's actually working by just removing the "not" and making sure it is actually getting proper
  // values from the instance.
  it('Modifies values upon selection', () => {
    const inst = renderer.create(
      <BinaryQuestion
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
        style={{ marginBottom: '20%' }}
      />
    );
    const checkBoxes = inst.root.findAllByType(CheckBox); // .root lets you find all the nice info like subcomponents

    for (const box of checkBoxes) {
      const one = inst.root.instance.state.oneChecked; // .instance has the concrete info or something
      box.props.onPress(); // apparently onpress is both a prop and a method so you can just...call it.
      expect(inst.root.instance.state.oneChecked).not.toBe(one);
    }
  });
});
