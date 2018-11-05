import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Slider } from 'react-native-elements';

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

  valueChanged(value) {
    this.setState({
      answer: value,
    });
    this.props.app.updateFirebase(this.props.fb, value);
  }

  render() {
    const { question, min, max, step, minLabel, maxLabel } = this.props;
    const { answer } = this.state;

    return (
      <View>
        <Text>{question}</Text>
        <Slider
          step={step}
          minimumValue={min}
          maximumValue={max}
          onValueChange={value => this.valueChanged(value)}
          value={answer}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ width: 100, height: 100, textAlign: 'left' }}>{minLabel}</Text>
          <Text style={{ width: 100, height: 100, textAlign: 'center' }}>{answer}</Text>
          <Text style={{ width: 100, height: 100, textAlign: 'right' }}>{maxLabel}</Text>
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
  minLabel: PropTypes.string.isRequired,
  maxLabel: PropTypes.string.isRequired,
};
