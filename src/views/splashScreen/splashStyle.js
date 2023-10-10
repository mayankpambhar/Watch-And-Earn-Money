import {StyleSheet} from 'react-native';
import {useMemo} from 'react';

export const useSplashStyle = () => {
  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, []);
  return style;
};
