/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import CompleteProfileOverlay from '../components/CompleteProfileOverlay';
import type { SignedRoutes } from '../routes';
import GameScreen from '../screens/GameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignedHomeScreen from '../screens/SignedHomeScreen';
import fetch from '../utils/fetch';

const AuthenticatedNavigation: React.FC = () => {
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);
  const Tab = createBottomTabNavigator<SignedRoutes>();

  const isPlayerProfileCompleted = async (): Promise<void> => {
    try {
      await fetch
        .catcher(404, () => {
          setIsProfileCompleted(false);
        })
        .get('/players/me');
    // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  useEffect(() => {
    void isPlayerProfileCompleted();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen component={SignedHomeScreen} name="SignedHome" options={{ title: 'Accueil' }} />
        <Tab.Screen component={ProfileScreen} name="Profile" options={{ title: 'Profil' }} />
        <Tab.Screen component={GameScreen} name="Game" options={{ title: 'Jouer' }} />
      </Tab.Navigator>
      { !isProfileCompleted ? <CompleteProfileOverlay isNewPlayer /> : null}
      <Toast ref={(ref: unknown) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthenticatedNavigation;
