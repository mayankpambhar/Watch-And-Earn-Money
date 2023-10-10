import {ToastAndroid} from 'react-native';

export const Toster = value => {
  return ToastAndroid.showWithGravity(
    value,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};
