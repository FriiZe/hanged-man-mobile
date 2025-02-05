import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import type { RoomsRoutes } from '../routes';
import fetch from '../utils/fetch';
import CodeOverlay from './CodeOverlay';

interface Props {
  id: string;
  name: string;
  isPublic: boolean;
  players: string[];
}

type NavigationProps = StackNavigationProp<RoomsRoutes, 'Rooms'>;

const RoomCard: React.FC<Props> = ({
  id, name, isPublic, players,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  const joinRoom = async (roomId: string): Promise<void> => {
    try {
      await fetch.post(`/rooms/${roomId}/join`);
      navigation.push('Lobby', { roomId });
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const toggleOverlay = (): void => {
    setShowCodeOverlay(!showCodeOverlay);
  };

  return (
    <ListItem
      style={{ marginTop: '3%' }}
      onPress={async (): Promise<void> => {
        if (!isPublic) {
          toggleOverlay();
        } else {
          await joinRoom(id);
        }
      }}
    >
      {isPublic ? null : (
        <Icon
          color="red"
          name="ios-lock"
          style={{ bottom: 0, marginLeft: '3%' }}
          type="ionicon"
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: 'black' }}>
          <Text>
            {players.length}
            {' '}
            joueur
            {players.length > 1 ? 's' : ''}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="black" />
      {
        showCodeOverlay
          ? (
            <CodeOverlay
              roomId={id}
              onBackdropPress={toggleOverlay}
            />
          )
          : null
      }
    </ListItem>
  );
};
export default RoomCard;
