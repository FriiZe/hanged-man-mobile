import { EventEmitter } from 'events';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';

import Navigation from './navigation';

const App = (): JSX.Element => {
  const emitter = new EventEmitter();

  useEffect(() => (): void => {
    emitter.removeAllListeners();
  });

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Navigation />
    </ThemeProvider>
  );
};
export default registerRootComponent(App);
