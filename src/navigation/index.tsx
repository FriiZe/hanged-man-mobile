/* eslint-disable no-nested-ternary */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  restore,
  selectIsRestoring,
  selectToken, signOut,
} from '../store/slices/auth';
import showToast from '../utils/showToast';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import UnauthenticatedNavigation from './UnauthenticatedNavigation';

const Navigation : React.FC = () => {
  const isRestoring = useSelector(selectIsRestoring);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const getToken = async (): Promise<void> => {
    let tkn: string | null = null;
    try {
      tkn = await AsyncStorage.getItem('userToken');
    } catch (err) {
      dispatch(signOut());
      showToast('Vous avez été déconnecté', 'Reconnectez-vous manuellement', 'info');
    }
    if (tkn !== null) {
      dispatch(restore({ token: tkn }));
    } else {
      dispatch(signOut());
    }
  };

  useEffect(() => {
    void getToken();
  }, []);

  return isRestoring
    ? <ActivityIndicator color="#0000ff" size="large" />
    : token
      ? <AuthenticatedNavigation />
      : <UnauthenticatedNavigation />;
};

export default Navigation;
