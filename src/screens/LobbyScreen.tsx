import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import LeaveRoomConfirmOverlay from '../components/LeaveRoomConfirmOverlay';
import type { RoomsRoutes } from '../routes';
import fetch from '../utils/fetch';
import type { BeforeRemoveEvent } from '../utils/types';

type Props = StackScreenProps<RoomsRoutes, 'Lobby'>;

/**
  * @todo(front)
  * create socket when join
  * emit event room({roomId})
  * listen event player-joined({playerId})
  * validator on codeRoom
  * listen event player-left({playerId})
  * show all players of a room
  * listen event when room is created
  * listen event when room is deleted
  * ask code when try to join private room
  *
  */

interface Player {
  displayName: string;
  id: string;
}

const LobbyScreen : React.FC<Props> = ({ navigation, route }) => {
  const [showLeaveRoomConfirmOverlay, setShowLeaveRoomConfirmOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roomPlayers, setRoomPlayers] = useState<Player[]>([]);
  const [event, setEvent] = useState<BeforeRemoveEvent | null>(null);
  const { roomId } = route.params;

  const toggleOverlay = (): void => {
    setShowLeaveRoomConfirmOverlay(!showLeaveRoomConfirmOverlay);
  };

  const getAllRoomPlayers = async (): Promise<void> => {
    try {
      setRoomPlayers(await fetch.get<Player[]>(`/rooms/${roomId}/players`));
    // eslint-disable-next-line no-empty
    } catch (err) {}
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

  useEffect(() => {
    setIsLoading(true);
    void getAllRoomPlayers();
    setIsLoading(false);
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    }}
    >
      {
      isLoading
        ? <ActivityIndicator color="#0000ff" size="large" />
        : (
          <View style={{ bottom: 0, width: '90%' }}>
            <ScrollView style={{ marginTop: '5%', maxHeight: '80%' }}>
              {roomPlayers.map(
                (player) => (
                  <ListItem key={player.id} style={{ marginTop: '3%' }}>
                    <ListItem.Content>
                      <ListItem.Title>
                        {player.displayName}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ),
              )}
            </ScrollView>
            <LeaveRoomConfirmOverlay
              event={event}
              isVisible={showLeaveRoomConfirmOverlay}
              roomId={roomId}
              onBackdropPress={toggleOverlay}
            />
          </View>
        )
      }
    </View>
  );
};
export default LobbyScreen;
