import React from 'react';
import { View } from 'react-native';

import SignUpForm from '../components/SignUpForm';

const SignUpScreen = (): JSX.Element => (
  <View style={{
    flex: 1, justifyContent: 'center',
  }}
  >
    <SignUpForm />
  </View>
);

export default SignUpScreen;
