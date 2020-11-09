import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

const App = (): JSX.Element => (
  <ThemeProvider>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignInScreen} name="SignUp" />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);

export default registerRootComponent(App);
