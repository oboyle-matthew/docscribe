import React from 'react';
import Pain from './src/Pain';
import Mobility from './src/Mobility';
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Pain: { screen: Pain },
  Mobility:  { screen: Mobility },
});

export default App;
