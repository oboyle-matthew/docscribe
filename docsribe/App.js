import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextQuestion from './src/components/TextQuestion';
import SliderQuestion from './src/components/SliderQuestion';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TextQuestion question={"This is the first question: "}/>
          <TextQuestion question={"This is the second question: "}/>
          <TextQuestion question={"This is the third question: "}/>
          <SliderQuestion question={"Please rate your average pain throughout the day: "} min={0} max={10} step={1}
                          minLabel={"No pain at all"} maxLabel={"Pain as bad as it possibly could be"}
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
