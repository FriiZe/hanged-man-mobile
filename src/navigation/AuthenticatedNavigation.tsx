/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileOverlay from '../components/CompleteProfileOverlay';
import type { SignedRoutes } from '../routes';
import ProfileScreen from '../screens/ProfileScreen';
import {
  fetchPlayer, selectDisplayName, selectId,
} from '../store/slices/player';
import RoomsNavigation from './RoomsNavigation';

const AuthenticatedNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator<SignedRoutes>();
  const dispatch = useDispatch();
  const myPlayerId = useSelector(selectId);
  const isProfileCompleted = useSelector(selectDisplayName);

  useEffect(() => {
    if (myPlayerId === '') {
      dispatch(fetchPlayer());
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator lazy initialRouteName="Game">
        <Tab.Screen component={ProfileScreen} name="Profile" options={{ title: 'Profil' }} />
        <Tab.Screen component={RoomsNavigation} name="Game" options={{ title: 'Jouer' }} />
      </Tab.Navigator>
      { !isProfileCompleted ? <CompleteProfileOverlay isNewPlayer /> : null}
      <Toast ref={(ref: unknown) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthenticatedNavigation;
