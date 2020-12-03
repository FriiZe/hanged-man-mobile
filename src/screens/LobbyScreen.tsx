import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

import LeaveRoomConfirmOverlay from '../components/LeaveRoomConfirmOverlay';
import useClient from '../hooks/useClient';
import type { RoomsRoutes } from '../routes';
import { selectToken } from '../store/slices/auth';
import fetch from '../utils/fetch';
import type { BeforeRemoveEvent } from '../utils/types';

type Props = StackScreenProps<RoomsRoutes, 'Lobby'>;
type NavProps = StackNavigationProp<RoomsRoutes, 'Lobby'>;
interface Player {
  displayName: string;
  id: string;
}

interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  players: string[];
  owner: string;
}

const LobbyScreen : React.FC<Props> = ({ navigation, route }) => {
  const [showLeaveRoomConfirmOverlay, setShowLeaveRoomConfirmOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [roomPlayers, setRoomPlayers] = useState<Player[]>([]);
  const [event, setEvent] = useState<BeforeRemoveEvent | null>(null);
  const token = useSelector(selectToken);
  const [client] = useClient(token, 'rooms');

  const { roomId } = route.params;

  const nav = useNavigation<NavProps>();

  const toggleOverlay = (): void => {
    setShowLeaveRoomConfirmOverlay(!showLeaveRoomConfirmOverlay);
  };

  const getAllRoomPlayers = async (): Promise<void> => {
    try {
      setRoomPlayers(await fetch.get<Player[]>(`/rooms/${roomId}/players`));
    // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  const getPlayer = async (playerId: string): Promise<void> => {
    const result = await fetch.get<Player>(`/players/${playerId}`);
    setRoomPlayers([...roomPlayers, result]);
  };

  const deletePlayer = (playerId: string): void => {
    const updatedPlayers = roomPlayers.filter((player) => playerId !== player.id);
    setRoomPlayers(updatedPlayers);
  };

  const createGame = async (): Promise<void> => {
    try {
      setIsButtonLoading(true);
      await fetch.post('/games', { roomId, trials: route.params.trials });
    // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  client?.on('player-joined', async ({ playerId }: {playerId: string}) => { await getPlayer(playerId); });

  client?.on('player-left', ({ playerId }: {playerId: string}) => { deletePlayer(playerId); });

  client?.on('game-created', ({ gameId }: {gameId:string}) => {
    nav.replace('Game', { gameId, players: roomPlayers });
  });

  const setRoomOwner = async (): Promise<void> => {
    const { owner } = await fetch.get<Room>(`/rooms/${roomId}`);
    const { id } = await fetch.get<Player>('/players/me');
    setIsOwner(owner === id);
  };

  useEffect(
    () => {
      navigation.addListener('beforeRemove', (e:BeforeRemoveEvent) => {
        if (e.data.action.type === 'POP') {
          e.preventDefault();
          setEvent(e);
          toggleOverlay();
        }
      });
    },
  );

  useEffect(() => {
    setIsLoading(true);
    void getAllRoomPlayers();
    void setRoomOwner();
    client?.emit('room', roomId);
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
        ? <ActivityIndicator color="#3a77d2" size="large" />
        : (
          <View style={{ bottom: 0, width: '90%' }}>
            <ScrollView style={{ height: '80%', marginTop: '5%' }}>
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
            {
              isOwner
                ? (
                  <Button
                    buttonStyle={{ marginTop: '10%' }}
                    disabled={roomPlayers.length < 2}
                    loading={isButtonLoading}
                    title="Lancer la partie"
                    onPress={async (): Promise<void> => {
                      await createGame();
                    }}
                  />
                )
                : null
            }
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
