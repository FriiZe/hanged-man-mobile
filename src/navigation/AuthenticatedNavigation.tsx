/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileOverlay from '../components/CompleteProfileOverlay';
import type { SignedRoutes } from '../routes';
import ProfileScreen from '../screens/ProfileScreen';
import {
  fetchPlayer, selectDisplayName, selectId, selectIsLoading,
} from '../store/slices/player';
import RoomsNavigation from './RoomsNavigation';

const AuthenticatedNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator<SignedRoutes>();
  const dispatch = useDispatch();
  const currentPlayerId = useSelector(selectId);
  const isProfileCompleted = useSelector(selectDisplayName);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (currentPlayerId === '') {
      dispatch(fetchPlayer());
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        lazy
        initialRouteName="Game"
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }): JSX.Element => {
            let iconName = '';

            if (route.name === 'Profile') {
              iconName = 'ios-person';
            } else if (route.name === 'Game') {
              iconName = 'logo-game-controller-a';
            }

            return <Ionicons color={color} name={iconName} size={size} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3a77d2',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen component={ProfileScreen} name="Profile" options={{ title: 'Profil' }} />
        <Tab.Screen component={RoomsNavigation} name="Game" options={{ title: 'Jouer' }} />
      </Tab.Navigator>
      { !isProfileCompleted && !isLoading ? <CompleteProfileOverlay /> : null}
      <Toast ref={(ref: unknown) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthenticatedNavigation;
