import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { Slider } from 'react-native-elements';
import happyFace from '../../../../assets/happy2.png';
import sadFace from '../../../../assets/sad2.png';
import AppStore from '../../../stores/AppStore';

export default class SliderQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 0
    };
  }

  componentDidMount() {
    const { max, min, app, fb } = this.props;
    if (app.object[fb] === null) {
      app.object[fb] = (max + min) / 2;
    }
  }

  valueChanged(value) {
    this.props.app.updateFirebase(this.props.fb, value);
    this.setState({
      answer: value
    })
  }

  render() {
    const { question, min, max, step, app, fb } = this.props;

    return (
      <View>
        <Text>{question}</Text>
        <Slider
          step={step}
          minimumValue={min}
          maximumValue={max}
          onValueChange={value => this.valueChanged(value)}
          value={app.object[fb] === null ? (min + max) / 2 : app.object[fb]}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            source={happyFace}
            style={{ width: 50, height: 50 }}
            accessibilityLabel="Happy face."
          />
          <Text>{app.object[fb] === null ? (min + max) / 2 : app.object[fb]}</Text>
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
  fb: PropTypes.string.isRequired,
  app: PropTypes.instanceOf(AppStore).isRequired,
};
