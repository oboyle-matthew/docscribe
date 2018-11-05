import React, { Fragment } from 'react';
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import BinaryQuestion from './components/BinaryQuestion';
import SliderQuestion from './components/SliderQuestion';
import AppStore from './stores/AppStore';

const app = new AppStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default class Pain extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
  }

  submit() {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    console.log(Object.keys(app.object));
    app.submitToFirebase();
    this.setState({ submitted: true });
  }

  confirm() {
    Alert.alert('Submit', 'Are you sure you want to submit the above information for today', [
      { text: 'Yes', onPress: () => this.submit() },
      { text: 'No', style: 'cancel' },
    ]);
  }

  render() {
    const { submitted } = this.state;
    const { navigation } = this.props;
    const app = navigation.getParam('app');

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {submitted ? (
          <View>
            <Text>You have submitted!</Text>
            <Button
              style={{ backgroundColor: 'red' }}
              title="Submit another form"
              onPress={() => this.setState({ submitted: false })}
            />
          </View>
        ) : (
          <Fragment>
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
              question={'\n\nPlease rate your average pain throughout the day: '}
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
