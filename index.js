import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/router';
import store from './src/store/store';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
