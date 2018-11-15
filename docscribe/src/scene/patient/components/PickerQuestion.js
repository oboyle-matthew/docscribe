import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker, Icon, Form } from 'native-base';
import PropTypes from 'prop-types';

export default class PickerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: 0,
    };
  }

  updateValue(value) {
    const { onValueChanged } = this.props;
    this.setState({ chosen: value });
    {
      onValueChanged && onValueChanged(value);
    }
  }

  render() {
    const { question, options, placeholder } = this.props;
    const { chosen } = this.state;
    return (
      <View style={{ height: '15%', alignItems: 'center' }}>
        <Text>{question}</Text>
        <Picker
          iosIcon={<Icon name="ios-arrow-dropdown" />}
          style={{ width: 300 }}
          mode="dropdown"
          placeholder={placeholder}
          selectedValue={chosen}
          onValueChange={value => this.updateValue(value)}
        >
          <Picker.Item disabled value="pills" label={placeholder} />
          {options.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    );
  }
}

PickerQuestion.propTypes = {
  question: PropTypes.string.isRequired,
};
