import React from 'react';
import { View } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../store/slices/auth';
import { selectDisplayName, selectGamesWon } from '../store/slices/player';

const ProfileScreen : React.FC = () => {
  const playerName = useSelector(selectDisplayName);
  const victoriesCount = useSelector(selectGamesWon);
  const dispatch = useDispatch();

  return (
    <View style={{
      alignItems: 'center', flex: 1, marginTop: '20%',
    }}
    >
      <ListItem
        style={{
          backgroundColor: 'white',
          display: 'flex',
          height: '10%',
          justifyContent: 'center',
          marginTop: '3%',
          width: '80%',
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold' }}>
            <Text h3>
              Bonjour
              {' '}
              {playerName}
            </Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        style={{
          backgroundColor: 'white',
          display: 'flex',
          height: '10%',
          justifyContent: 'center',
          marginTop: '3%',
          width: '80%',
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold' }}>
            <Text h4>
              Tu as
              {' '}
              {victoriesCount}
              {' '}
              victoire
              {victoriesCount > 1 ? 's' : ''}
            </Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <View style={{ marginTop: '120%', width: '80%' }}>
        <Button
          title="Déconnexion"
          onPress={(): void => { dispatch(signOut()); }}
        />
      </View>
    </View>
  );
};
export default ProfileScreen;
