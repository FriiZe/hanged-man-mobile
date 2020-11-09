/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Toast from 'react-native-toast-message';

export default (title: string, message: string, type: 'success' | 'error' | 'info'): void => {
  Toast.show({
    position: 'top', text1: title, text2: message, topOffset: 50, type, visibilityTime: 2000,
  });
};
