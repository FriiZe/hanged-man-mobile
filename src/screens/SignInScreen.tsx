import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import SignInForm from '../components/SignInForm';

const SignInScreen = (): JSX.Element => (
  <View>
    <Text h1> Ceci est la page de connexion</Text>
    <SignInForm />
  </View>
);

export default SignInScreen;
