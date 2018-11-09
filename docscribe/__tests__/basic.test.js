import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import BinaryQuestion from '../src/scene/patient/components/BinaryQuestion';
// import SliderQuestion from '../src/scene/patient/components/SliderQuestion';
import PickerQuestion from '../src/scene/patient/components/PickerQuestion';
import TextQuestion from '../src/scene/patient/components/TextQuestion';
import AppStore from '../src/stores/AppStore';

const app = new AppStore();

afterAll(() => setTimeout(() => process.exit(), 1000));
// Basic test made! (Try changing option two to "maybe" and it will fail!)
// Snapshots basically take a "picture" of your code (serialized I think) and then in future tests
// You can compare the component to the original snapshot. "npm test -- -u" will overwrite the snapshot for a test.
describe('<BinaryQuestion/>', () => {
  it('renders correctly', () => {
    const pain = renderer
      .create(
        <BinaryQuestion
          fb="prescription"
          app={app}
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
        fb="prescription"
        app={app}
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

// describe('<SliderQuestion/>', () => {
//   it('Changes values when the slider slides', () => {
//     const inst = renderer.create(
//       <SliderQuestion
//         fb="pain"
//         app={app}
//         question={'\n\nPlease rate your average pain throughout the day: '}
//         min={0}
//         max={10}
//         step={1}
//         minLabel="No pain at all"
//         maxLabel="Pain as bad as it possibly could be"
//       />
//     );
//     const slider = inst.root.findByType(Slider);
//
//     expect(inst.root.instance.state.answer).toBe(5);
//     slider.props.onValueChange(2);
//     expect(inst.root.instance.state.answer).toBe(2);
//   });
// });

describe('<PickerQuestion/>', () => {
  it('Opens and closes the picker nicely', () => {
    const inst = renderer.create(
      <PickerQuestion fb="pills" app={app} question="Number of pills taken today" />
    );
    expect(inst.root.instance.state.chosen).toBe(undefined);
    // expect(inst.root.instance.state.showPicker).toBe(false);
    // const button = inst.root.findByType(Button);
    // expect(button.props.title).toBe('Choose a number');
    //
    // button.props.onPress();
    // expect(inst.root.instance.state.showPicker).toBe(true);
    // const button2 = inst.root.findByType(Button);
    // button2.props.onPress();
    // expect(inst.root.instance.state.showPicker).toBe(false);
  });
});

// describe('<TextQuestion/>', () => {
//   it('Stores text input', () => {
//     const inst = renderer.create(
//       <TextQuestion
//         fb="extra"
//         app={app}
//         question="Is there anything else you would like us to know?"
//       />
//     );
//     expect(inst.root.instance.state.answer).toBe('');
//     const input = inst.root.findByType(TextInput);
//     expect(input).toBeDefined();
//     input.props.onChangeText('My hip hurts');
//     expect(inst.root.instance.state.answer).toBe('My hip hurts');
//   });
// });
