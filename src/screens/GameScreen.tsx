import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import useClient from '../hooks/useClient';
import type { RoomsRoutes } from '../routes';
import { selectToken } from '../store/slices/auth';
import { selectId } from '../store/slices/player';
import fetch from '../utils/fetch';
import type { BeforeRemoveEvent } from '../utils/types';

type Props = StackScreenProps<RoomsRoutes, 'Game'>;

interface Game {
  id: string;
  winner: string | null;
  isFinished: boolean;
  trials: number;
  partialWord: string;
  currentPlayer: string;
  wordHistory: string[];
  letterHistory: string[];
}

interface Player {
  displayName: string;
  id: string;
}

const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const { players: pl, gameId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [players] = useState(pl ?? []);
  const [game, setGame] = useState<Game | null>(null);
  const [input, setInput] = useState('');

  const token = useSelector(selectToken);
  const playerId = useSelector(selectId);
  const [client] = useClient(token, 'games');

  const partialWord = game?.partialWord ?? '';

  const getCurrentPlayer = (): Player | null => players
    .filter((item) => item.id === game?.currentPlayer)[0];

  const getWinnerPlayer = (): Player | null => players
    .filter((item) => item.id === game?.winner)[0];

  const submitInput = (): void => {
    client?.emit('play', { gameId, input: input.trim() });
    setInput('');
  };

  useEffect(
    () => {
      navigation.addListener('beforeRemove', (e:BeforeRemoveEvent) => {
        if (e.data.action.type === 'POP') {
          e.preventDefault();
        }
      });
    },
  );

  const getGame = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const gm = await fetch.get<Game>(`/games/${gameId}`);
      setGame(gm);
      // eslint-disable-next-line no-empty
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    client?.emit('game', gameId);
    void getGame();
  }, []);

  useEffect(() => {
  }, [game]);

  client?.on('player-played', (newGame: Game) => {
    setGame(newGame);
  });

  return (
    <View style={{
      flex: 1,
    }}
    >
      {
        isLoading
          ? <ActivityIndicator color="#3a77d2" size="large" />
          : (
            <View>
              <View style={{ marginLeft: '3%', marginTop: '3%' }}>
                <Text>
                  Historique des lettres :
                  {' '}
                  {game?.letterHistory.join(', ')}
                </Text>
                <Text style={{ marginTop: '3%' }}>
                  Historique des mots :
                  {' '}
                  {[game?.wordHistory].join(', ')}
                </Text>
              </View>
              <View style={{ alignItems: 'center', display: 'flex', marginTop: '20%' }}>
                {
                game?.isFinished
                  ? (
                    <Text h3>
                      {`${getWinnerPlayer()?.displayName ?? 'Personne n\''} `}
                      a gagné !
                    </Text>
                  )
                  : (
                    <Text h3>
                      À
                      {' '}
                      {getCurrentPlayer()?.displayName}
                      {' '}
                      de jouer :
                    </Text>
                  )
              }
                <Text h2 style={{ marginTop: '5%' }}>{[...partialWord].join(' ')}</Text>
                <View style={{ marginTop: '70%', width: '80%' }}>
                  <Input
                    label="Proposition"
                    placeholder="Lettre ou mot"
                    value={input}
                    onChangeText={(value): void => { setInput(value); }}
                  />
                  <Text style={{ marginBottom: '5%', marginLeft: '3%', marginTop: '-5%' }}>
                    Il reste
                    {' '}
                    {game?.trials ? game.trials + 1 : 0}
                    {' '}
                    essai(s) par personne
                  </Text>
                  {
                game?.isFinished
                  ? (
                    <Button
                      title="Revenir aux salons"
                      onPress={(): void => { navigation.replace('Rooms'); }}
                    />
                  )
                  : (
                    <Button
                      disabled={game?.currentPlayer !== playerId}
                      title="Soumettre"
                      onPress={(): void => { submitInput(); }}
                    />
                  )
              }
                </View>
              </View>

            </View>
          )
      }
    </View>
  );
};

export default GameScreen;
