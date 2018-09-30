import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import TextQuestion from './components/TextQuestion';
import SliderQuestion from './components/SliderQuestion';
import BinaryQuestion from './components/BinaryQuestion';
import PickerQuestion from "./components/PickerQuestion";

export default class Pain extends React.Component {
  static navigationOptions = {
    title: 'Mobility',
  };

  constructor() {
      super();
      this.state = {
          submitted: false,
      }
  }

  submit() {
      this.setState({submitted: true})
  }

  confirm() {
      Alert.alert(
          'Submit',
          "Are you sure you want to submit the above information for today",
          [
              {text: 'Yes', onPress: () => this.submit()},
              {text: 'No', style: 'cancel'},
          ]
      )
  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.submitted ? <View><Text>You have submitted!</Text>
              <Button style={{backgroundColor: 'red'}} title={"Submit another form"} onPress={() => this.setState({submitted: false})}/></View>
          : <View>
          <Text/> <Text/> <Text/>
          <BinaryQuestion question={"Have you been using your crutches?"}
                          optionOne={"Yes"} optionTwo={"No"}
          />
              <Button style={{backgroundColor: 'red'}} title={"Submit"} onPress={() => this.confirm()}/></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});