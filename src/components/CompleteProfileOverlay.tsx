import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Icon, Input, Overlay, Text,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import {
  createPlayer, selectDisplayName, selectIsLoading, updatePlayer,
} from '../store/slices/player';

interface Props {
  closeOverlay: () => void
}

const CompleteProfileOverlay: React.FC<Props> = ({ closeOverlay }) => {
  const [displayName, setDisplayName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const currentDisplayName = useSelector(selectDisplayName);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const submit = (): void => {
    if (!currentDisplayName) {
      dispatch(createPlayer(displayName));
      setIsVisible(false);
    } else {
      dispatch(updatePlayer(displayName));
      setIsVisible(false);
      closeOverlay();
    }
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
            onPress={(): void => { submit(); }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default CompleteProfileOverlay;
