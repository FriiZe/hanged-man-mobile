/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import type { RoomsRoutes } from '../routes';
import GameScreen from '../screens/GameScreen';
import LobbyScreen from '../screens/LobbyScreen';
import RoomsScreen from '../screens/RoomsScreen';

const RoomsNavigation: React.FC = () => {
  const Stack = createStackNavigator<RoomsRoutes>();

  return (
    <Stack.Navigator initialRouteName="Rooms">
      <Stack.Screen component={RoomsScreen} name="Rooms" options={{ title: 'Salons' }} />
      <Stack.Screen component={LobbyScreen} name="Lobby" options={{ title: 'Salon de la partie' }} />
      <Stack.Screen component={GameScreen} name="Game" options={{ title: 'Partie en cours' }} />
    </Stack.Navigator>
  );
};

export default RoomsNavigation;
