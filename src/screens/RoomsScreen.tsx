import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, ScrollView, View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import CreateRoomOverlay from '../components/CreateRoomOverlay';
import RoomCard from '../components/RoomCard';
import useClient from '../hooks/useClient';
import { selectToken } from '../store/slices/auth';
import fetch from '../utils/fetch';

interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  players: string[];
}

const RoomsScreen : React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const token = useSelector(selectToken);
  const [client] = useClient(token, 'rooms');

  const getRoom = async (roomId: string): Promise<void> => {
    const result = await fetch.get<Room>(`/rooms/${roomId}`);
    setRooms([...rooms, result]);
  };

  const deleteRoom = (roomId: string): void => {
    const updatedRooms = rooms.filter((room) => roomId !== room.id);
    setRooms(updatedRooms);
  };

  client?.on('room-created', async ({ roomId }: {roomId: string}) => { await getRoom(roomId); });

  client?.on('room-deleted', ({ roomId }: {roomId: string}) => { deleteRoom(roomId); });

  const toggleOverlay = (): void => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const getAllRooms = async (): Promise<void> => {
    try {
      setRooms(await fetch.get<Room[]>('/rooms'));
    // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  useEffect(() => {
    setIsLoading(true);
    void getAllRooms();
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
                {rooms.map(
                  (room) => (
                    <RoomCard
                      id={room.id}
                      isPublic={room.isPublic}
                      key={room.id}
                      name={room.name}
                      players={room.players}
                    />
                  ),
                )}
              </ScrollView>
              <Button
                buttonStyle={{ marginTop: '5%' }}
                title="Creer une partie"
                onPress={(): void => toggleOverlay()}
              />
            </View>
          )
      }
      {isOverlayVisible
        ? (
          <CreateRoomOverlay
            onBackdropPress={toggleOverlay}
          />
        )
        : null}
    </View>
  );
};
export default RoomsScreen;
