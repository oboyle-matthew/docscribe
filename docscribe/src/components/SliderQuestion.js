import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { Slider } from 'react-native-elements';

import sadFace from '../../assets/sad.png';
import happyFace from '../../assets/happy.png';

export default class SliderQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: -1,
    };
  }

  componentDidMount() {
    const { max, min } = this.props;
    this.setState({
      answer: (max + min) / 2,
    });
  }

  render() {
    const { question, min, max, step } = this.props;
    const { answer } = this.state;

    return (
      <View>
        <Text>{question}</Text>
        <Slider
          step={step}
          minimumValue={min}
          maximumValue={max}
          onValueChange={value => this.setState({ answer: value })}
          value={answer}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            source={happyFace}
            style={{ width: 50, height: 50 }}
            accessibilityLabel="Happy face."
          />
          <Text>{answer}</Text>
          <Image
            source={sadFace}
            style={{ width: 50, height: 50 }}
            accessibilityLabel="Sad face."
          />
        </View>
      </View>
    );
  }
}

SliderQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};
