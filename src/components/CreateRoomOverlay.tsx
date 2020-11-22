import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Icon, Input, Overlay, Text,
} from 'react-native-elements';

import type { RoomsRoutes } from '../routes';
import fetch from '../utils/fetch';

interface Props {
  onBackdropPress: () => void
}

type NavigationProps = StackNavigationProp<RoomsRoutes, 'Rooms'>;

const CreateRoomOverlay: React.FC<Props> = ({ onBackdropPress }) => {
  const [roomName, setRoomName] = useState('');
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const submit = async (): Promise<void> => {
    setIsLoading(true);
    let roomId: string | null = null;
    try {
      const { id } = await fetch.post<{id: string}>('/rooms', { code, name: roomName });
      roomId = id;
    } catch (err) {
      setIsLoading(false);
    }
    setIsLoading(false);
    onBackdropPress();
    if (roomId) {
      navigation.push('Lobby', { roomId });
    }
  };

  return (
    <View>
      <Overlay
        isVisible
        overlayStyle={{ width: '70%' }}
        onBackdropPress={onBackdropPress}
      >
        <View>
          <Text h4 style={{ marginBottom: '10%', marginTop: '5%' }}>Créer une partie</Text>
          <Input
            autoCapitalize="none"
            label="Nom"
            leftIcon={(
              <Icon
                color="#adb5bd"
                name="ios-text"
                type="ionicon"
              />
            )}
            placeholder="Nom de la partie"
            value={roomName}
            onChangeText={(value): void => { setRoomName(value); }}
          />
          <Input
            secureTextEntry
            keyboardType="number-pad"
            label="Code"
            leftIcon={(
              <Icon
                color="#adb5bd"
                name="ios-lock"
                type="ionicon"
              />
            )}
            placeholder="4 chiffres (optionnel)"
            value={code}
            onChangeText={(value): void => { setCode(value); }}
          />
          <Button
            disabled={!roomName}
            loading={isLoading}
            title="Confirmer"
            onPress={async ():Promise<void> => { await submit(); }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default CreateRoomOverlay;
