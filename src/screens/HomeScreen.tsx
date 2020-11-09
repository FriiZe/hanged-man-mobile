/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import type { UnsignedRoutes } from '../routes';
import showToast from '../utils/showToast';

type HomeProps = StackScreenProps<UnsignedRoutes, 'Home'>;

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Button
      buttonStyle={{ alignSelf: 'center', marginBottom: 10 }}
      title="Inscription"
      onPress={(): void => navigation.push('SignUp')}
    />
    <Button
      buttonStyle={{
        alignSelf: 'center', marginBottom: 10,
      }}
      title="Connexion"
      onPress={(): void => navigation.push('SignIn')}
    />
    <Button
      buttonStyle={{
        alignSelf: 'center', marginBottom: 10,
      }}
      title="Show Toast"
      onPress={(): void => {
        showToast('Salut les gens !', 'Bonjour à tous', 'info');
      }}
    />
  </View>
);

export default HomeScreen;
