import { Ionicons } from '@expo/vector-icons';
import { AppLoading, registerRootComponent } from 'expo';
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Container, Row, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = (): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async (): Promise<void> => {
      const roboto = require('native-base/Fonts/Roboto.ttf');
      const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

      await loadAsync({
        Roboto: roboto,
        Roboto_medium: robotoMedium,
        ...Ionicons.font,
      });

      setIsReady(true);
    };
    void loadFonts();
  });

  return !isReady
    ? <AppLoading />
    : (
      <Container>
        <StatusBar style="auto" />
        <Row style={styles.centered}>
          <Text>Hello, World !</Text>
        </Row>
      </Container>
    );
};

export default registerRootComponent(App);
