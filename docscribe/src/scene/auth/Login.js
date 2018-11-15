import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import FontAwesome from '@expo/vector-icons/fonts/FontAwesome.ttf';
import Ionicons from '@expo/vector-icons/fonts/Ionicons.ttf';
import MaterialIcons from '@expo/vector-icons/fonts/MaterialIcons.ttf';
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


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome,
      Ionicons,
      'Material Icons': MaterialIcons,
    });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { navigation, screenProps } = this.props;
    const app = screenProps;
    app.app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          app.user = AppStore.spliceEmail(user.user.email);
          app.logIn();
          navigation.navigate('Pain');
        }
      })
      .catch(() => {
        Alert.alert("That combination doesn't exist in our records!");
      });
  };

  render = () => {
    const { email, errorMessage, password } = this.state;
    const { navigation, screenProps } = this.props;
    const app = screenProps;
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
          onPress={() => navigation.navigate('SignUp')}
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
