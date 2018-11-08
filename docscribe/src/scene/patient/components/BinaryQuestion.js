import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AppStore from '../../../stores/AppStore';

export default class BinaryQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneChecked: false,
      twoChecked: false,
    };
  }

  checkOne = () => {
    const { app, fb } = this.props;
    app.updateFirebase(fb, true);
    const { oneChecked, twoChecked } = this.state;
    if (!oneChecked && twoChecked) {
      this.setState({
        twoChecked: false,
      });
    }
    this.setState({
      oneChecked: !oneChecked,
    });
  };

  checkTwo = () => {
    const { app, fb } = this.props;
    app.updateFirebase(fb, false);
    const { oneChecked, twoChecked } = this.state;
    if (!twoChecked && oneChecked) {
      this.setState({
        oneChecked: false,
      });
    }
    this.setState({
      twoChecked: !twoChecked,
    });
  };

  render() {
    const { question, optionOne, optionTwo, app, fb } = this.props;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ width: '40%', textAlign: 'center' }}>{question}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <CheckBox title={optionOne} checked={app.object[fb] === true} onPress={this.checkOne} />
          <CheckBox title={optionTwo} checked={app.object[fb] === false} onPress={this.checkTwo} />
        </View>
      </View>
    );
  }
}

BinaryQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  fb: PropTypes.string.isRequired,
  app: PropTypes.instanceOf(AppStore).isRequired,
};
