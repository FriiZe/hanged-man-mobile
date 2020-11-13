import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import AuthContext from '../helpers/AuthContext';

const ProfileScreen : React.FC = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{
      flex: 1, justifyContent: 'center',
    }}
    >
      <Text>Écran de profil</Text>
      <Button
        title="Deconnexion"
        onPress={async (): Promise<void> => {
          await signOut();
        }}
      />
    </View>
  );
};
export default ProfileScreen;
