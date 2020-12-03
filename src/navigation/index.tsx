import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import type { Context } from '../helpers/AuthContext';
import AuthContext from '../helpers/AuthContext';
import login from '../helpers/signIn';
import signUp from '../helpers/signUp';
import store from '../store';
import {
  restore,
  selectIsLoading,
  selectToken,
  signIn, signOut,
} from '../store/slices/auth';
import showToast from '../utils/showToast';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import UnauthenticatedNavigation from './UnauthenticatedNavigation';

const Navigation : React.FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  const getToken = async (): Promise<void> => {
    let t: string | null = null;
    try {
      t = await AsyncStorage.getItem('userToken');
    } catch (err) {
      store.dispatch(signOut());
      showToast('Vous avez été déconnecté', 'Reconnectez-vous manuellement', 'info');
    }
    if (t !== null) store.dispatch(restore({ token: t }));
    else store.dispatch(signOut());
  };

  useEffect(() => {
    void getToken();
  }, []);

  const authContext = React.useMemo<Context>(() => ({
    signIn: async (username: string, password: string): Promise<void> => {
      const t = await login(username, password);
      await AsyncStorage.setItem('userToken', t);
      store.dispatch(signIn({ token: t }));
    },
    signOut: async (): Promise<void> => {
      await AsyncStorage.removeItem('userToken');
      store.dispatch(signOut());
    },
    signUp: async (username: string, password: string): Promise<void> => {
      await signUp(username, password);
    },
  }), []);
  return isLoading
    ? <ActivityIndicator color="#3a77d2" size="large" />
    : (
      <AuthContext.Provider value={authContext}>
        {token ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
      </AuthContext.Provider>
    );
};

export default Navigation;
