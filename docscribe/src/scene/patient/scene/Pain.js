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
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    this.setState({
      today: app.getCurrentDate(),
    });
    registerForPushNotifications(app, app.user);
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
    const { navigation } = this.props;
    const { today } = this.state;
    const app = navigation.getParam('app');
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
        <TextQuestion fb="comment" app={app} question="Any comments for today?" />
        <SliderQuestion
          fb="pain"
          app={app}
          question={'\n\nPlease rate your average pain throughout the day: '}
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
        <PickerQuestion app={app} fb="pills" question="Number of pills taken today" />
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

Pain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
