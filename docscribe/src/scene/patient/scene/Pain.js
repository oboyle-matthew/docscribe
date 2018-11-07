import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import TextQuestion from '../components/TextQuestion';
import SliderQuestion from '../components/SliderQuestion';
import BinaryQuestion from '../components/BinaryQuestion';
import PickerQuestion from '../components/PickerQuestion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const Pain = props => {
  const { navigation } = props;
  const app = navigation.getParam('app');
  const user = navigation.getParam('user');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>User: {user}</Text>
      <TextQuestion fb="comment" app={app} question="Any comments for today?" />
      <SliderQuestion
        fb="pain"
        app={app}
        question={'\n\nPlease rate your average pain throughout the day: '}
        min={0}
        max={10}
        step={1}
      />
      <BinaryQuestion
        fb="prescription"
        app={app}
        question="Did you adhere to the prescribed usage guidelines today?"
        optionOne="Yes"
        optionTwo="No"
      />
      <PickerQuestion app={app} fb="pills" question="Number of pills taken today" />
      <Button
        rightIcon={{ name: 'navigate-next' }}
        backgroundColor="#1F96F4"
        title="CONTINUE"
        onPress={() => navigation.navigate('Mobility', { app: app, user: user })}
      />
    </ScrollView>
  );
};

Pain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Pain;