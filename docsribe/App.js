import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextQuestion from './src/components/TextQuestion';
import SliderQuestion from './src/components/SliderQuestion';
import BinaryQuestion from './src/components/BinaryQuestion';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TextQuestion question={"This is an example of a text question: "}/>
          <SliderQuestion question={"\n\nPlease rate your average pain throughout the day: "} min={0} max={10} step={1}
                          minLabel={"No pain at all"} maxLabel={"Pain as bad as it possibly could be"}
          />
          <BinaryQuestion question={"Have you been using your crutches?"}
                          optionOne={"Yes"} optionTwo={"No"}
          />
          <BinaryQuestion question={"Did you adhere to the prescribed usage guidelines today?"}
                          optionOne={"Yes"} optionTwo={"No"}
          />
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
