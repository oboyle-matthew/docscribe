import { createStackNavigator } from 'react-navigation';
import Pain from './src/Pain';
import Mobility from './src/Mobility';

const App = createStackNavigator(
  {
    Pain: { screen: Pain },
    Mobility: { screen: Mobility },
  },
  {
    initialRouteName: 'Pain', // first page to be shown
  }
);

export default App;
