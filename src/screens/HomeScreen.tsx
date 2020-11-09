import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import type { UnsignedRoutes } from '@/routes';

type HomeProps = StackScreenProps<UnsignedRoutes, 'Home'>;

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Button
      buttonStyle={{ alignSelf: 'center', marginBottom: 10 }}
      title="Inscription"
      onPress={(): void => navigation.navigate('SignUp')}
    />
    <Button
      buttonStyle={{
        alignSelf: 'center', marginBottom: 10,
      }}
      title="Connexion"
      onPress={(): void => navigation.navigate('SignIn')}
    />
  </View>
);

export default HomeScreen;
