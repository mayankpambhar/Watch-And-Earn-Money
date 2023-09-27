import {StyleSheet} from 'react-native';
import {useMemo} from 'react';

export const useTwoGbStyle = () => {
  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
      },
    });
  }, []);
  return style;
};
