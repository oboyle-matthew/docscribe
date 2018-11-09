import { createSwitchNavigator } from 'react-navigation';

import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import Pain from '../patient/scene/Pain';
import Mobility from '../patient/scene/Mobility';

const Welcome = createSwitchNavigator(
  {
    SignUp,
    Login,
    Pain,
    Mobility,
  },
  {
    initialRouteName: 'Login',
  }
);

export default Welcome;
