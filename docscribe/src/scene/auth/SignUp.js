import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
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

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  handleSignUp = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    return app.app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          app.user = AppStore.spliceEmail(user.user.email);
          navigation.navigate('Pain', { app });
        }
      })
      .catch(error => {
        alert(error);
        this.setState({
          password: '',
        }).catch(() => {
          alert('Try again!');
          this.setState({
            password: '',
          });
        });
      });
  };

  render() {
    const { errorMessage, email, password } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate('Login', { app })}
        />
      </View>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
