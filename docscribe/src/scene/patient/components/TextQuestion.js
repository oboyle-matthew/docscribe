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
    const { app, fb } = this.props;
    const answer = app.object[fb] === null ? '' : app.object[fb];
    this.setState({
      answer,
    });
  }

  textChange = newText => {
    this.props.app.updateFirebase(this.props.fb, newText);
    // this.props.app[this.props.fb] = newText;
    this.setState({ answer: newText });
  };

  render() {
    const { question, fb, app } = this.props;
    const { answer } = this.state;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ width: '40%' }}>{question}</Text>
        <TextInput
          multiline
          blurOnSubmit
          style={{ borderColor: 'gray', borderWidth: 1, height: '100%', width: '50%' }}
          onChangeText={this.textChange}
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
