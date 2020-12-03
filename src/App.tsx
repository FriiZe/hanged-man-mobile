import { EventEmitter } from 'events';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import getEnvironment from './helpers/getEnvironment';
import Navigation from './navigation';
import store from './store';

const environment = getEnvironment();

const App = (): JSX.Element => {
  const emitter = new EventEmitter();

  useEffect(() => (): void => {
    emitter.removeAllListeners();
  });

  LogBox.ignoreAllLogs(environment.hideLogBox);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Navigation />
      </ThemeProvider>
    </Provider>
  );
};
export default registerRootComponent(App);
