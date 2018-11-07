import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

export default class PickerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        {
          label: '0',
          value: 0,
        },
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5 or more',
          value: 5,
        },
      ],
    };
  }

  render() {
    const { question, app, fb } = this.props;
    const { numbers } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ width: '50%' }}>{question}</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Select a number...',
            value: null,
          }}
          items={numbers}
          onValueChange={value => {
            app.updateFirebase(fb, value);
            app.object[fb] = value;
          }}
          value={app.object[fb]}
        />
      </View>
    );
  }
}

PickerQuestion.propTypes = {
  question: PropTypes.string.isRequired,
};
