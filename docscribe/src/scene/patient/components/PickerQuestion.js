import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker, Icon } from 'native-base';
import PropTypes from 'prop-types';
import AppStore from '../../../stores/AppStore';

const DEFAULT = '0';

export default class PickerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ['0', '1', '2', '3', '4', '5+'],
    };
  }

  render() {
    const { question, app, fb } = this.props;
    const { numbers } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text>{question}</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          selectedValue={app.object[fb] ? app.object[fb] : DEFAULT}
          onValueChange={value => {
            app.updateFirebase(fb, value);
            app.object[fb] = value;
          }}
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
  fb: PropTypes.string.isRequired,
  app: PropTypes.instanceOf(AppStore).isRequired,
};
