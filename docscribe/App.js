import { createStackNavigator } from 'react-navigation';
import Pain from './src/Pain';
import Mobility from './src/Mobility';

const App = createStackNavigator(
  {
    Pain: {
      screen: Pain,
      navigationOptions: {
        title: 'Pain',
      },
    },
    Mobility: {
      screen: Mobility,
      navigationOptions: {
        title: 'Mobility',
      },
    },
  },
  {
    initialRouteName: 'Pain', // first page to be shown
    transitionConfig: () => ({
      isModal: true,
    }),
  }
);

export default App;
