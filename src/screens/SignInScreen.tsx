import React from 'react';
import { View } from 'react-native';

import SignInForm from '../components/SignInForm';

const SignInScreen = (): JSX.Element => (
  <View style={{
    flex: 1, justifyContent: 'center',
  }}
  >
    <SignInForm />
  </View>
);

export default SignInScreen;
