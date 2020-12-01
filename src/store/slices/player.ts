import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import fetch from '../../utils/fetch';

interface State {
  id: string;
  displayName: string;
  gamesWon: number;
  isInGame: boolean;
  isLoading: boolean;
  isInRoom: boolean;
}

const initialState: State = {
  displayName: '',
  gamesWon: 0,
  id: '',
  isInGame: false,
  isInRoom: false,
  isLoading: false,
};

export const fetchPlayer = createAsyncThunk('player/fetchPlayer', async () => {
  try {
    return await fetch.get<Omit<State, 'isLoading'>>('/players/me');
  // eslint-disable-next-line no-empty
  } catch (err) {
    return initialState;
  }
});

const playerSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchPlayer.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(fetchPlayer.fulfilled, (state, action: PayloadAction<Omit<State, 'isLoading'>>) => (
      { ...action.payload, isLoading: false }
    ));
    builder.addCase(fetchPlayer.rejected, (state) => ({ ...state, isLoading: false }));
  },
  initialState,
  name: 'player',
  reducers: {
    incrementWins: (state): State => (
      { ...state, gamesWon: state.gamesWon + 1 }
    ),
    joinGame: (state): State => (
      { ...state, isInGame: true }
    ),
    joinRoom: (state): State => (
      { ...state, isInRoom: true }
    ),
    leaveGame: (state): State => (
      { ...state, isInGame: false }
    ),
    leaveRoom: (state): State => (
      { ...state, isInRoom: false }
    ),
  },
});

export const selectId = (state: {player: State}): string => state.player.id;
export const selectIsLoading = (state: {player: State}): boolean => state.player.isLoading;
export const selectDisplayName = (state: {player: State}): string => state.player.displayName;

export const {
  incrementWins, joinGame, joinRoom, leaveGame, leaveRoom,
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
