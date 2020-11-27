/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  initialState: {
    isLoading: true,
    token: null as string | null,
  },
  name: 'auth',
  reducers: {
    restore: (state, action) => ({ ...state, isLoading: false, token: action.payload.token }),
    signIn: (state, action) => ({ ...state, token: action.payload.token }),
    signOut: (state) => ({ ...state, isLoading: false, token: null }),
  },
});

export const selectIsLoading = (state: any) => state.auth.isLoading;
export const selectToken = (state: any) => state.auth.token;

export const { restore, signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
