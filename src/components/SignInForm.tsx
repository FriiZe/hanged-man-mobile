import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

const SignInForm = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        label="Mot de passe"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        onChangeText={(value): void => { setPassword(value); }}
      />
      <Button
        buttonStyle={{
          alignSelf: 'center',
          marginTop: 10,
          width: '70%',
        }}
        disabled={!username || !password}
        title="Se connecter"
        onPress={():void => {}}
      />
    </View>
  );
};

export default SignInForm;
