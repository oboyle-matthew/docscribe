import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import TextQuestion from './src/components/TextQuestion';
import SliderQuestion from './src/components/SliderQuestion';
import BinaryQuestion from './src/components/BinaryQuestion';
import PickerQuestion from "./src/components/PickerQuestion";

export default class Pain extends React.Component {
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
            <TextQuestion question={"Any comments for today?"}/>
            <SliderQuestion question={"\n\nPlease rate your average pain throughout the day: "} min={0} max={10} step={1}
                            minLabel={"No pain at all"} maxLabel={"Pain as bad as it possibly could be"}
            />
            <BinaryQuestion question={"Have you been using your crutches?"}
                            optionOne={"Yes"} optionTwo={"No"}
            />
            <BinaryQuestion question={"Did you adhere to the prescribed usage guidelines today?"}
                            optionOne={"Yes"} optionTwo={"No"} style={{marginBottom: '20%'}}
            />
            <Text/> <Text/>
            <PickerQuestion question={"Number of pills taken today"}/>
            <Text/> <Text/> <Text/> <Text/> <Text/>
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