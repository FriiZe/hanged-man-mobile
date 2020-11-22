import React from 'react';
import { Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

interface Props {
  id: string;
  name: string;
  isPublic: boolean;
  players: string[];
}

const RoomCard: React.FC<Props> = ({
  id, name, isPublic, players,
}) => (
  <ListItem
    style={{ marginTop: 10 }}
  >
    {isPublic ? null : (
      <Icon
        color="red"
        name="ios-lock"
        style={{ bottom: 0, marginLeft: 10 }}
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
  </ListItem>
);
export default RoomCard;
