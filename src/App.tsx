import { EventEmitter } from 'events';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import Navigation from './navigation';
import store from './store';

const App = (): JSX.Element => {
  const emitter = new EventEmitter();

  useEffect(() => (): void => {
    emitter.removeAllListeners();
  });

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
