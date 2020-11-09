import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';

const App = (): JSX.Element => (
  <ThemeProvider>
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  </ThemeProvider>
);

export default registerRootComponent(App);
