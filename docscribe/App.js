import React from 'react';
import AppStore from './src/stores/AppStore';
import Welcome from './src/scene/welcome/Welcome';

const app = new AppStore();

export default class App extends React.Component {
  render() {
    return <Welcome screenProps={app} />;
  }
}
