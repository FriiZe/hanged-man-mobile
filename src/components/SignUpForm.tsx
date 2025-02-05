import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import type { UnsignedRoutes } from '../routes';
import { selectIsLoading, signUp } from '../store/slices/auth';

type Props = StackNavigationProp<UnsignedRoutes, 'SignUp'>;

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  const submit = (): void => {
    dispatch(signUp({ password, username }));
    navigation.replace('SignIn', { username });
  };

  const errorMessage = confirmPassword !== password && confirmPassword !== ''
    ? 'Les mots de passe sont différents'
    : '';

  const validator = password.length < 8 && password !== '' ? 'Au moins 8 caractères' : '';

  return (
    <View style={{ alignSelf: 'center', width: '80%' }}>
      <Input
        autoCapitalize="none"
        label="Nom d'utilisateur"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-person"
            type="ionicon"
          />
        )}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={(value): void => { setUsername(value); }}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        errorMessage={validator}
        label="Mot de passe"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        placeholder="Min. 8 caractères"
        value={password}
        onChangeText={(value): void => { setPassword(value); }}
      />
      <Input
        renderErrorMessage
        secureTextEntry
        autoCapitalize="none"
        disabled={password.length < 8}
        errorMessage={errorMessage}
        label="Confirmation"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        placeholder="Confirmez le mot de passe"
        value={confirmPassword}
        onChangeText={(value): void => { setConfirmPassword(value); }}
      />
      <Button
        buttonStyle={{
          alignSelf: 'center',
          marginTop: '5%',
          width: '70%',
        }}
        disabled={!username || !password || !confirmPassword}
        loading={isLoading}
        title="S'inscrire"
        onPress={(): void => { submit(); }}
      />
    </View>
  );
};

export default SignUpForm;
