import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useSplashStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      Imageicon: {
        height: hp(200),
        width: wp(200),
      },
    });
  }, [hp, wp]);
  return style;
};
