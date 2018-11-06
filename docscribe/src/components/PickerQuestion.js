import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class PickerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: '0',
      numbers: ['0', '1', '2', '3', '4', '5 or more'],
    };
  }

  render() {
    const { question, app, fb } = this.props;
    const { numbers, chosen } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text>{question}</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          selectedValue={chosen}
          onValueChange={value => this.setState({ chosen: value })}
        >
          {numbers.map(option => (
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
