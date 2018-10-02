import React from 'react';
import Pain from './src/Pain';
import Mobility from './src/Mobility';
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Pain: { screen: Pain },
  Mobility:  { screen: Mobility },
}, {
    initialRouteName: 'Pain', // specifies first page to be shown
});

export default App;
