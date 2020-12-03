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
  isVisible: boolean;
}

const CompleteProfileOverlay: React.FC<Props> = ({ isVisible: isV }) => {
  const [displayName, setDisplayName] = useState('');
  const [isVisible, setIsVisible] = useState(isV);
  const currentDisplayName = useSelector(selectDisplayName);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const submit = (): void => {
    // if (displayName) {
    //   if (currentDisplayName && onBackdropPress) {
    //     dispatch(updatePlayer(displayName));
    //     setIsVisible(false);
    //     onBackdropPress();
    //   } else {
    //     dispatch(createPlayer(displayName));
    //     setIsVisible(false);
    //   }
    // }
    console.log(displayName, currentDisplayName);
    if (!currentDisplayName) {
      dispatch(createPlayer(displayName));
      setIsVisible(false);
    } else {
      dispatch(updatePlayer(displayName));
      setIsVisible(false);
      // if (onBackdropPress) onBackdropPress();
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
