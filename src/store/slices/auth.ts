import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type State = {
  token: string | null;
  isLoading: boolean;
};

const initialState: State = {
  isLoading: true,
  token: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    restore: (state, action: PayloadAction<{token: string}>): State => (
      { ...state, isLoading: false, token: action.payload.token }
    ),
    signIn: (state, action: PayloadAction<{token: string}>): State => (
      { ...state, token: action.payload.token }
    ),
    signOut: (state): State => ({ ...state, isLoading: false, token: null }),
  },
});

export const selectIsLoading = (state: {auth: State}): boolean => state.auth.isLoading;
export const selectToken = (state: {auth: State}): string | null => state.auth.token;

export const { restore, signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
