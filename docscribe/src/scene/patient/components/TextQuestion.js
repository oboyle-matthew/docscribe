import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';

export default class TextQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: '',
    };
  }

  componentDidMount() {
    const { app, objectKey } = this.props;
    app &&
      app.object &&
      this.setState({
        answer: app.object[objectKey],
      });
  }

  render() {
    const { question, app, objectKey } = this.props;
    const { answer } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ width: '40%' }}>{question}</Text>
        <TextInput
          multiline
          blurOnSubmit
          style={{ borderColor: 'gray', borderWidth: 1, height: '100%', width: '50%' }}
          onChangeText={text => {
            this.setState({ answer: text });
            app.object[objectKey] = text;
          }}
          placeholder="Input your answer here"
          value={answer}
        />
      </View>
    );
  }
}

TextQuestion.propTypes = {
  question: PropTypes.string.isRequired,
};
