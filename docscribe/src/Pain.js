import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import TextQuestion from './components/TextQuestion';
import SliderQuestion from './components/SliderQuestion';
import BinaryQuestion from './components/BinaryQuestion';
import PickerQuestion from './components/PickerQuestion';

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
      <TextQuestion question="Any comments for today?" />
      <SliderQuestion
        question={'\n\nPlease rate your average pain throughout the day: '}
        min={0}
        max={10}
        step={1}
      />
      <BinaryQuestion
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
        style={{ marginBottom: '20%' }}
      />
      <Text /><Text />
      <PickerQuestion question="Number of pills taken today" />
      <Text /><Text /><Text /><Text /><Text />
      <Button title="Continue" onPress={() => navigation.navigate('Mobility')} />
    </ScrollView>
  );
};

Pain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Pain;
