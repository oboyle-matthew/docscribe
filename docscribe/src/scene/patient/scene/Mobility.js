import React, { Fragment } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import BinaryQuestion from '../components/BinaryQuestion';
import SliderQuestion from '../components/SliderQuestion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default class Mobility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      today: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    this.setState({
      today: app.getCurrentDate(),
    });
  }

  submit() {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    app.submitToFirebase();
    this.setState({ submitted: true });
  }

  confirm() {
    Alert.alert('Submit', 'Are you sure you want to submit the above information for today', [
      { text: 'Yes', onPress: () => this.submit() },
      { text: 'No', style: 'cancel' },
    ]);
  }

  incrementDate() {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    app.incrementDate();
    this.setState({
      today: app.getCurrentDate(),
    });
  }

  decrementDate() {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    app.decrementDate();
    this.setState({
      today: app.getCurrentDate(),
    });
  }

  render() {
    const { submitted, today } = this.state;
    const { navigation } = this.props;
    const app = navigation.getParam('app');

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          style={{ backgroundColor: 'red' }}
          title="HOME"
          onPress={() => navigation.navigate('Login')}
        />

        {submitted ? (
          <View>
            <Text>You have submitted!</Text>
            <Button
              style={{ backgroundColor: 'red' }}
              title="Submit another form"
              onPress={() => navigation.navigate('Pain', { app })}
            />
          </View>
        ) : (
          <Fragment>
            <Button
              backgroundColor="#1F96F4"
              title="BACK"
              onPress={() => navigation.navigate('Pain', { app })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={{ backgroundColor: 'red' }}
                title="<="
                onPress={() => this.decrementDate()}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text>{app.user}</Text>
                <Text>{today}</Text>
              </View>
              <Button
                style={{ backgroundColor: 'red' }}
                title="=>"
                onPress={() => this.incrementDate()}
              />
            </View>

            <BinaryQuestion
              fb="crutches"
              app={app}
              question="Have you been using your crutches?"
              optionOne="Yes"
              optionTwo="No"
            />
            <SliderQuestion
              app={app}
              fb="mobility"
              question="Please rate your average pain throughout the day:"
              min={0}
              max={10}
              step={1}
            />
            <Button
              rightIcon={{ name: 'expand-less' }}
              backgroundColor="#1F96F4"
              title="SUBMIT"
              onPress={() => this.confirm()}
            />
          </Fragment>
        )}
      </ScrollView>
    );
  }
}

Mobility.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
