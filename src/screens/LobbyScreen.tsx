import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import LeaveRoomConfirmOverlay from '../components/LeaveRoomConfirmOverlay';
import type { RoomsRoutes } from '../routes';
import type { BeforeRemoveEvent } from '../utils/types';

type Props = StackScreenProps<RoomsRoutes, 'Lobby'>;

const LobbyScreen : React.FC<Props> = ({ navigation, route }) => {
  const [showLeaveRoomConfirmOverlay, setShowLeaveRoomConfirmOverlay] = useState(false);
  const [event, setEvent] = useState<BeforeRemoveEvent | null>(null);
  const { roomId } = route.params;

  const toggleOverlay = (): void => {
    setShowLeaveRoomConfirmOverlay(!showLeaveRoomConfirmOverlay);
  };

  useEffect(
    () => {
      navigation.addListener('beforeRemove', (e:BeforeRemoveEvent) => {
        e.preventDefault();
        setEvent(e);
        toggleOverlay();
      });
    },
  );

  return (
    <View style={{
      flex: 1, justifyContent: 'center',
    }}
    >
      <Text>
        Écran de lobby
        {roomId}
      </Text>
      <LeaveRoomConfirmOverlay
        event={event}
        isVisible={showLeaveRoomConfirmOverlay}
        roomId={roomId}
        onBackdropPress={toggleOverlay}
      />

    </View>
  );
};
export default LobbyScreen;
