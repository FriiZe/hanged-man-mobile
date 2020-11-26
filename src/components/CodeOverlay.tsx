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
import showToast from '../utils/showToast';

interface Props {
  onBackdropPress: () => void
  roomId: string
}

type NavigationProps = StackNavigationProp<RoomsRoutes, 'Rooms'>;

const CodeOverlay: React.FC<Props> = ({ onBackdropPress, roomId }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const submit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await fetch
        .catcher(403, () => { showToast('Le code est erroné', 'Demande le code au créateur du salon ou aux devs', 'error'); })
        .post(`/rooms/${roomId}/join`, { code });
      onBackdropPress();
      navigation.push('Lobby', { roomId });
    // eslint-disable-next-line no-empty
    } catch (error) {}
    setIsLoading(false);
  };

  const codeValidator = code.length === 4 || code.length === 0 ? '' : '4 caractères';

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
            secureTextEntry
            errorMessage={codeValidator}
            keyboardType="number-pad"
            label="Code"
            leftIcon={(
              <Icon
                color="#adb5bd"
                name="ios-lock"
                type="ionicon"
              />
            )}
            placeholder="4 chiffres"
            value={code}
            onChangeText={(value): void => { setCode(value); }}
          />
          <Button
            disabled={!(code.length === 4)}
            loading={isLoading}
            title="Confirmer"
            onPress={async ():Promise<void> => { await submit(); }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default CodeOverlay;
