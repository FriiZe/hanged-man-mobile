import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import fetch from '../utils/fetch';
import showToast from '../utils/showToast';

const SignUpForm: React.FC = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async (): Promise<void> => {
    setIsButtonLoading(true);

    try {
      await fetch
        .catcher(409, () => {
          showToast('Identifiant déjà utilisé', 'Veuillez choisir un autre identifiant', 'error');
        })
        .post('/auth/register', { body: { password, username } });
    } catch (err) {
      return;
    } finally {
      setIsButtonLoading(false);
    }

    showToast('Compte créé avec succès', 'Essayez de vous connecter sur la page de connexion', 'success');
  };

  const errorMessage = confirmPassword !== password && confirmPassword !== ''
    ? 'Les mots de passe sont différents'
    : '';

  const validator = password.length < 8 && password !== '' ? 'Au moins 8 caractères' : '';

  return (
    <View style={{ alignSelf: 'center', width: '80%' }}>
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
        onChangeText={(value): void => { setPassword(value); }}
      />
      <Input
        renderErrorMessage
        secureTextEntry
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
