import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import wretch from '../utils/wretch';

const SignUpForm: React.FC = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async (): Promise<void> => {
    setIsButtonLoading(true);
    // TODO
    await wretch
      .url('/auth/register')
      .catcher(500, (err) => {})
      .catcher(409, (err) => {})
      .catcher(422, (err) => {})
      .post({ password, username });
    setIsButtonLoading(false);
  };

  return (
    <View style={{ display: 'flex' }}>
      <Input
        label="Nom d'utilisateur"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-person"
            type="ionicon"
          />
        )}
        placeholder="Nom d'utilisateur"
        onChangeText={(value): void => { setUsername(value); }}
      />
      <Input
        secureTextEntry
        label="Mot de passe"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        placeholder="Min. 8 caractères"
        onChangeText={(value): void => { setPassword(value); }}
      />
      <Input
        secureTextEntry
        disabled={!password}
        label="Confirmation"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        placeholder="Confirmez le mot de passe"
        onChangeText={(value): void => { setConfirmPassword(value); }}
      />
      <Button
        buttonStyle={{
          alignSelf: 'center',
          marginTop: 10,
          width: '70%',
        }}
        disabled={!username || !password || !confirmPassword}
        loading={isButtonLoading}
        title="S'inscrire"
        onPress={async ():Promise<void> => { await signUp(); }}
      />
    </View>
  );
};

export default SignUpForm;
