import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import TextQuestion from '../components/TextQuestion';
import SliderQuestion from '../components/SliderQuestion';
import BinaryQuestion from '../components/BinaryQuestion';
import PickerQuestion from '../components/PickerQuestion';
import registerForPushNotifications from '../../../notifications/Notifications';

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
  constructor(props) {
    super(props);
    this.state = {
      today: '',
    };
  }

  componentDidMount() {
    const { screenProps } = this.props;
    const app = screenProps;
    this.setState({
      today: app.getCurrentDate(),
    });
    registerForPushNotifications(app, app.user);
  }

  incrementDate() {
    const { screenProps } = this.props;
    const app = screenProps;
    app.incrementDate();
    this.setState({
      today: app.getCurrentDate(),
    });
  }

  decrementDate() {
    const { screenProps } = this.props;
    const app = screenProps;
    app.decrementDate();
    this.setState({
      today: app.getCurrentDate(),
    });
  }

  render() {
    const { screenProps, navigation } = this.props;
    const app = screenProps;
    const { today } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          style={{ backgroundColor: 'red' }}
          title="HOME"
          onPress={() => navigation.navigate('Login')}
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
        <TextQuestion app={screenProps} objectKey="comment" question="Any comments for today?" />
        <SliderQuestion
          fb="pain"
          app={app}
          question="Please rate your average pain throughout the day:"
          min={0}
          max={10}
          step={1}
        />
        <BinaryQuestion
          fb="prescription"
          app={app}
          question="Did you adhere to the prescribed usage guidelines today?"
          optionOne="Yes"
          optionTwo="No"
        />
        <PickerQuestion
          app={app}
          options={['0', '1', '2', '3', '4', '5+']}
          fb="pills"
          question="Number of pills taken today"
        />
        <Button
          rightIcon={{ name: 'navigate-next' }}
          backgroundColor="#1F96F4"
          title="CONTINUE"
          onPress={() => navigation.navigate('Mobility', { app })}
        />
      </ScrollView>
    );
  }
}
