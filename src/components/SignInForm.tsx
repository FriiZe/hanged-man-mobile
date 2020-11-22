import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import AuthContext from '../helpers/AuthContext';

interface Props {
  username?: string
}

const SignInForm: React.FC<Props> = ({ username: us }) => {
  const [username, setUsername] = useState(us ?? '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = React.useContext(AuthContext);

  const submit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signIn(username, password);
    } catch (err) {
      setIsLoading(false);
    }
  };

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
        label="Mot de passe"
        leftIcon={(
          <Icon
            color="#adb5bd"
            name="ios-lock"
            type="ionicon"
          />
        )}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(value): void => { setPassword(value); }}
      />
      <Button
        buttonStyle={{
          alignSelf: 'center',
          marginTop: 10,
          width: '70%',
        }}
        disabled={!username || !password}
        loading={isLoading}
        title="Se connecter"
        onPress={async ():Promise<void> => { await submit(); }}
      />
    </View>
  );
};

export default SignInForm;
