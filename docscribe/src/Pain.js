import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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

export default class Pain extends React.Component {
  static navigationOptions = {
    title: 'Pain',
  };

  confirm() {
    Alert.alert('Submit', 'Are you sure you want to submit the above information for today', [
      { text: 'Yes', onPress: () => this.submit() },
      { text: 'No', style: 'cancel' },
    ]);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TextQuestion question="Any comments for today?" />
        <SliderQuestion
          question={'\n\nPlease rate your average pain throughout the day: '}
          min={0}
          max={10}
          step={1}
          minLabel="No pain at all"
          maxLabel="Pain as bad as it possibly could be"
        />
        <BinaryQuestion
          question="Did you adhere to the prescribed usage guidelines today?"
          optionOne="Yes"
          optionTwo="No"
          style={{ marginBottom: '20%' }}
        />
        <Text /> <Text />
        <PickerQuestion question="Number of pills taken today" />
        <Text /> <Text /> <Text /> <Text /> <Text />
        <Button title="Continue" onPress={() => navigation.navigate('Mobility')} />
      </View>
    );
  }
}

Pain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
