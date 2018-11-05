import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import TextQuestion from './components/TextQuestion';
import SliderQuestion from './components/SliderQuestion';
import BinaryQuestion from './components/BinaryQuestion';
import PickerQuestion from './components/PickerQuestion';
import AppStore from "./stores/AppStore";

const app = new AppStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Pain = props => {
  const { navigation } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextQuestion fb="comment" app={app} question="Any comments for today?" />
      <SliderQuestion
        fb="pain"
        app={app}
        question={'\n\nPlease rate your average pain throughout the day: '}
        min={0}
        max={10}
        step={1}
        minLabel="No pain at all"
        maxLabel="Pain as bad as it possibly could be"
        style={{ marginBottom: '70%' }}
      />
      <BinaryQuestion
        fb="prescription"
        app={app}
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
        style={{ marginBottom: '20%' }}
      />
      <PickerQuestion fb="pills" app={app} question="Number of pills taken today" />
      <Button title="Continue" onPress={() => navigation.navigate('Mobility', {app})} />
    </ScrollView>
  );
};

Pain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Pain;
