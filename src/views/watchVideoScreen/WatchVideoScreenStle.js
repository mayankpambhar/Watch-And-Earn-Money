import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useWatchAndEarnStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        // height: '100%',
        // width: '100%',
        flex: 1,
      },
      buttonView: {
        // height: '100%',
        marginTop: hp(50),
      },
      coinView: {
        alignSelf: 'flex-end',
        marginEnd: wp(10),
        marginTop: hp(10),
        flexDirection: 'row',
      },
      coinTextView: {
        fontSize: 25,
        fontFamily: 'BalooBhai2-SemiBold',
        color: '#000',
      },
      rupee: {
        fontSize: 25,
        fontFamily: 'BalooBhai2-SemiBold',
        color: '#000',
        marginStart: 5,
      },
      titleView: {
        fontFamily: 'BalooBhai2-SemiBold',
        fontSize: 30,
        color: '#000',
        marginTop: hp(40),
        alignSelf: 'center',
      },
      submit: {
        //         marginTop: hp(130),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(50),
        width: wp(200),
        borderRadius: hp(10),
        backgroundColor: '#32CCC3',
      },
      submitText: {
        fontSize: 19,
        fontFamily: 'BalooBhai2-SemiBold',
        color: '#000',
      },
      bannerAds: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp(40),
      },
      BigbannerAds: {
        justifyContent: 'center',
        alignSelf: 'center',
        // marginTop: hp(40),
      },
      bannerAdsView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
      },
    });
  }, [hp, wp]);
  return style;
};
