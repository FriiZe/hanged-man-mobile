import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button, Overlay, Text,
} from 'react-native-elements';

import type { RoomsRoutes } from '../routes';
import fetch from '../utils/fetch';
import type { BeforeRemoveEvent } from '../utils/types';

interface Props {
  isVisible: boolean;
  onBackdropPress: () => void;
  event: BeforeRemoveEvent | null;
  roomId: string;
}
type NavigationProps = StackNavigationProp<RoomsRoutes, 'Lobby'>;

const LeaveRoomConfirmOverlay: React.FC<Props> = ({
  isVisible, onBackdropPress, event, roomId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const confirm = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (event) {
        await fetch.post(`/rooms/${roomId}/leave`);
        navigation.dispatch(event.data.action);
      }
    // eslint-disable-next-line no-empty
    } catch {}
    setIsLoading(false);
  };

  return (
    <View>
      <Overlay isVisible={isVisible}>
        <View style={{ alignItems: 'center', display: 'flex', marginTop: '5%' }}>
          <Text h4>Voulez vous quitter la salle ?</Text>
          <View style={{
            alignItems: 'flex-end', flexDirection: 'row', marginTop: '10%',
          }}
          >
            <Button
              buttonStyle={{ alignSelf: 'center', width: '80%' }}
              title="Non"
              onPress={():void => { onBackdropPress(); }}
            />
            <Button
              buttonStyle={{ alignSelf: 'center', width: '80%' }}
              loading={isLoading}
              title="Oui"
              onPress={async ():Promise<void> => { await confirm(); }}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default LeaveRoomConfirmOverlay;
