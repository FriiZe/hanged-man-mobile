import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import SignInForm from '../components/SignInForm';
import type { UnsignedRoutes } from '../routes';

type Props = StackScreenProps<UnsignedRoutes, 'SignIn'>;

const SignInScreen : React.FC<Props> = ({ route }) => (
  <View style={{
    flex: 1, justifyContent: 'center',
  }}
  >
    <SignInForm username={route.params?.username} />
  </View>
);
export default SignInScreen;
