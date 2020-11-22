import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, ScrollView, View,
} from 'react-native';
import { Button, Text } from 'react-native-elements';

import RoomCard from '../components/RoomCard';
import fetch from '../utils/fetch';

interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  players: string[];
}

const GameScreen : React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);

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
      marginTop: 70,
    }}
    >
      {
        isLoading
          ? <ActivityIndicator color="#0000ff" size="large" />
          : (
            <View style={{ bottom: 0, width: '90%' }}>
              <Text h3 style={{ alignItems: 'center' }}>Jouer une partie</Text>
              <ScrollView style={{ marginTop: 20, maxHeight: '75%' }}>
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
                style={{ marginTop: 20 }}
                title="Creer une partie"
              />
              <Button
                style={{ marginTop: 20 }}
                title="Rafraichir"
                onPress={async (): Promise<void> => { await getAllRooms(); }}
              />
            </View>
          )
      }
    </View>
  );
};
export default GameScreen;
