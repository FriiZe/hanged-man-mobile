import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { playerReducer } from './slices/player';

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
});

export default store;
