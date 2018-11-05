import React, { Component } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const PushNotification = require('react-native-push-notification');
// import PushNotificationAndroid from 'react-native-push-notification';
// import DeviceEventEmitter from 'react-native-push-notification';

export default class App extends Component {
  componentDidMount() {
    PushNotification.localNotificationSchedule({
      // ... You can use all the options from localNotifications
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 secs
    });
  }

  cancelNotification() {
    PushNotification.cancelAllLocalNotifications();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> A demo Site For Notifiers </Text>
        <Text style={styles.instructions}> A complete Notifier </Text>
        <Button
          style={{ paddingTop: '100px' }}
          title="cancel all"
          onPress={this.cancelNotification}
        >
          {' '}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// import { createStackNavigator } from 'react-navigation';
// import Pain from './src/Pain';
// import Mobility from './src/Mobility';
//
// const App = createStackNavigator(
//   {
//     Pain: {
//       screen: Pain,
//       navigationOptions: {
//         title: 'Pain',
//       },
//     },
//     Mobility: {
//       screen: Mobility,
//       navigationOptions: {
//         title: 'Mobility',
//       },
//     },
//   },
//   {
//     initialRouteName: 'Pain', // first page to be shown
//     transitionConfig: () => ({
//       isModal: true,
//     }),
//   }
// );
//
// export default App;
