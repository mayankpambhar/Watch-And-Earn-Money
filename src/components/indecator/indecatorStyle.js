import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useLoadingIndecatorStyle = () => {
  const {hp, wp} = useResponsiveScreen();
  const styles = useMemo(() => {
    return StyleSheet.create({
      loadingView: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#00000086',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      lottieAnimation: {
        width: wp(320),
        height: hp(320),
      },
    });
  }, [hp, wp]);
  return styles;
};
