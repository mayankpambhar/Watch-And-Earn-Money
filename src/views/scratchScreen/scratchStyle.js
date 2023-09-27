import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useScratchStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        alignSelf: 'center',
      },
      background_view: {
        position: 'absolute',
        width: wp(320),
        height: hp(315),
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        backgroundColor: '#e1e1e1',
      },
      scratch_card: {
        alignSelf: 'center',
        width: wp(320),
        height: hp(350),
        backgroundColor: 'transparent',
        borderRadius: 16,
      },
      rewardText: {
        position: 'absolute',
        fontSize: 40,
        color: 'black',
        fontFamily: 'BalooBhai2-Bold',
        alignSelf: 'center',
        bottom: hp(-10),
      },
      lottieAnimation: {
        width: wp(320),
        height: hp(320),
      },
    });
  }, [hp, wp]);
  return style;
};
