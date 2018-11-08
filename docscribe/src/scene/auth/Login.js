import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Permissions, Notifications } from 'expo';
import PropTypes from 'prop-types';
import AppStore from '../../stores/AppStore';

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

const app = new AppStore();

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  registerForPushNotifications = async user => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    if (status !== 'granted') {
      finalStatus = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (finalStatus !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    app.app
      .database()
      .ref(`users/${user}`)
      .update({
        expoPushToken: token,
      });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    app.app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          app.user = AppStore.spliceEmail(user.user.email);
          app.logIn();
          this.registerForPushNotifications(AppStore.spliceEmail(user.user.email));
          navigation.navigate('Pain', { app });
        }
      })
      .catch(() => {
        alert("That combination doesn't exist in our records!");
      });
  };

  render = () => {
    const { email, errorMessage, password } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('SignUp', { app })}
        />
      </View>
    );
  };
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
