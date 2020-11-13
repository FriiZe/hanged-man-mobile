import AsyncStorage from '@react-native-community/async-storage';
import { AppLoading } from 'expo';
import type { Reducer } from 'react';
import React, { useEffect, useReducer } from 'react';

import type { Context } from '../helpers/AuthContext';
import AuthContext from '../helpers/AuthContext';
import signIn from '../helpers/signIn';
import signUp from '../helpers/signUp';
import showToast from '../utils/showToast';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import UnauthenticatedNavigation from './UnauthenticatedNavigation';

interface State {
  token: string | null;
  isLoading: boolean;
}

type Action =
  { type: 'LOG_IN', token: string} |
  { type: 'LOG_OUT'} |
  { type: 'RESTORE_TOKEN', token: string};

const Navigation : React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>((prevState, action) => {
    switch (action.type) {
      case 'LOG_IN':
        return { ...prevState, token: action.token };
      case 'LOG_OUT':
        return { ...prevState, isLoading: false, token: null };
      case 'RESTORE_TOKEN':
        return { ...prevState, isLoading: false, token: action.token };
      default:
        return { ...prevState };
    }
  }, { isLoading: true, token: null });

  useEffect(() => {
    const getToken = async (): Promise<void> => {
      let token: string | null = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (err) {
        dispatch({ type: 'LOG_OUT' });
        showToast('Vous avez été déconnecté', 'Reconnectez-vous manuellement', 'info');
      }
      if (token !== null) dispatch({ token, type: 'RESTORE_TOKEN' });
      else {
        dispatch({ type: 'LOG_OUT' });
      }
    };
    void getToken();
  }, []);

  const authContext = React.useMemo<Context>(() => ({
    signIn: async (username: string, password: string): Promise<void> => {
      const token = await signIn(username, password);
      await AsyncStorage.setItem('userToken', token);
      dispatch({ token, type: 'LOG_IN' });
    },
    signOut: async (): Promise<void> => {
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: 'LOG_OUT' });
    },
    signUp: async (username: string, password: string): Promise<void> => {
      await signUp(username, password);
    },
  }), []);

  return state.isLoading
    ? <AppLoading />
    : (
      <AuthContext.Provider value={authContext}>
        {state.token ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
      </AuthContext.Provider>
    );
};

export default Navigation;
