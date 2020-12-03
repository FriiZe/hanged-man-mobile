import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Icon, Input, Overlay, Text,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { createPlayer, selectIsLoading } from '../store/slices/player';

const CompleteProfileOverlay: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const submit = (): void => {
    dispatch(createPlayer(displayName));
    setIsVisible(false);
  };

  return (
    <View>
      <Overlay isVisible={isVisible}>
        <View>
          <Text h4>Créer mon profil</Text>
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
            onPress={(): void => { submit(); }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default CompleteProfileOverlay;
