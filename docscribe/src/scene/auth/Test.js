import { createSwitchNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import Patient from '../patient/Patient';
import Pain from '../patient/scene/Pain';
import Mobility from '../patient/scene/Mobility';

// create our app's navigation stack
const App = createSwitchNavigator(
  {
    SignUp,
    Login,
    Patient,
    Pain,
    Mobility,
  },
  {
    initialRouteName: 'SignUp',
  }
)

export default App;
