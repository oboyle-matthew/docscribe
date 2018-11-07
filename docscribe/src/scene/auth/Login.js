import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Permissions, Notifications } from 'expo';
import AppStore from '../../stores/AppStore';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  registerForPushNotifications = async user => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    console.log(`users/${user}`);

    const { navigation } = this.props;
    const app = navigation.getParam('app');
    // console.log(app.app.database().ref(`users/${user}`));
    app.app
      .database()
      .ref(`users/${user}`)
      .update({
        expoPushToken: token,
      });
  };

  handleLogin = () => {
    const { navigation } = this.props;
    const app = navigation.getParam('app');
    app.app
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (user) {
          alert("You've successfully logged in!");
          navigation.navigate('Pain', { app, user: user.user.email });
          this.registerForPushNotifications(AppStore.spliceEmail(user.user.email));
        }
      })
      .catch(error => {
        alert("That combination doesn't exist in our records!");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
