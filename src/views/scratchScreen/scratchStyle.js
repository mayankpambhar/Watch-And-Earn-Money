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
        borderRadius: 16,
        alignSelf: 'center',
      },
      cardView: {
        top: hp(210),
      },
      background_view: {
        width: wp(320),
        height: hp(315),
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        backgroundColor: '#e1e1e1',
      },
      scratch_card: {
        alignSelf: 'center',
        width: wp(320),
        height: hp(317),
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
      rupeeRow: {
        marginTop: hp(25),
        alignSelf: 'flex-end',
        marginRight: wp(30),
        flexDirection: 'row',
      },
      coin: {
        fontFamily: 'BalooBhai2-Bold',
        fontSize: 25,
        color: 'black',
        marginTop: hp(-5),
      },
      rupee: {
        fontSize: 25,
        color: 'black',
        marginLeft: wp(5),
        fontFamily: 'BalooBhai2-Bold',
        marginTop: hp(-5),
      },
    });
  }, [hp, wp]);
  return style;
};
