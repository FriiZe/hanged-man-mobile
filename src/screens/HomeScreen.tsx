/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import type { UnsignedRoutes } from '../routes';

type Props = StackScreenProps<UnsignedRoutes, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <View style={{
    alignSelf: 'center', flex: 1, justifyContent: 'center', width: '80%',
  }}
  >
    <Button
      buttonStyle={{ alignSelf: 'center', marginBottom: '3%', width: '100%' }}
      title="Inscription"
      onPress={(): void => navigation.push('SignUp')}
    />
    <Button
      buttonStyle={{
        alignSelf: 'center',
        width: '100%',
      }}
      title="Connexion"
      onPress={(): void => navigation.push('SignIn')}
    />
  </View>
);

export default HomeScreen;
