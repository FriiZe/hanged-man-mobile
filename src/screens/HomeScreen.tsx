import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

const HomeScreen = (): JSX.Element => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Button
      buttonStyle={{ alignSelf: 'center', marginBottom: 10 }}
      title="Inscription"
    />
    <Button
      buttonStyle={
        { alignSelf: 'center', marginBottom: 10 }
      }
      title="Connexion"
    />
  </View>
);

export default HomeScreen;
