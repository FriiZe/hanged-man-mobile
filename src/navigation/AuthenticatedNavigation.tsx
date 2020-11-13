/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';

import type { SignedRoutes } from '../routes';
import GameScreen from '../screens/GameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignedHomeScreen from '../screens/SignedHomeScreen';

const AuthenticatedNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator<SignedRoutes>();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen component={SignedHomeScreen} name="SignedHome" options={{ title: 'Accueil' }} />
        <Tab.Screen component={ProfileScreen} name="Profile" options={{ title: 'Profil' }} />
        <Tab.Screen component={GameScreen} name="Game" options={{ title: 'Jouer' }} />
      </Tab.Navigator>
      <Toast ref={(ref: unknown) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthenticatedNavigation;
