import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';

import AppStore from '../../../stores/AppStore';

export default class TextQuestion extends React.Component {
  constructor() {
    super();
    this.answer = '';
  }

  textChange = newText => {
    const { app, fb } = this.props;
    app.updateFirebase(fb, newText);
  };

  render() {
    const { question, fb, app } = this.props;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ width: '40%' }}>{question}</Text>
        <TextInput
          multiline
          blurOnSubmit
          style={{ borderColor: 'gray', borderWidth: 1, height: '100%', width: '50%' }}
          onChangeText={this.textChange}
          placeholder="Input your answer here"
          value={app.object[fb]}
        />
      </View>
    );
  }
}

TextQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  fb: PropTypes.string.isRequired,
  app: PropTypes.instanceOf(AppStore).isRequired,
};
