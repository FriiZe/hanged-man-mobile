import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Icon, Input, Overlay, Text,
} from 'react-native-elements';

import fetch from '../utils/fetch';

interface Props {
  isNewPlayer?: boolean;
}

const CompleteProfileOverlay: React.FC<Props> = ({ isNewPlayer = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeOverlay = (): void => {
    setIsVisible(false);
  };

  const submit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isNewPlayer) {
        await fetch.post('/players', { displayName });
      } else {
        await fetch.patch('/players/me', { displayName });
      }
    } catch (err) {
      setIsLoading(false);
    }
    setIsLoading(false);
    closeOverlay();
  };

  return (
    <View>
      <Overlay isVisible={isVisible}>
        <View>
          <Text h4>Modifier mon profil</Text>
          <Input
            autoCapitalize="none"
            label="Pseudo"
            leftIcon={(
              <Icon
                color="#adb5bd"
                name="ios-person"
                type="ionicon"
              />
            )}
            placeholder="Pseudo affiché"
            value={displayName}
            onChangeText={(value): void => { setDisplayName(value); }}
          />
          <Button
            disabled={!displayName}
            loading={isLoading}
            title="Confirmer"
            onPress={async ():Promise<void> => { await submit(); }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default CompleteProfileOverlay;
