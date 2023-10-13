import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useRedeemStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F7F7f4',
      },

      boxView: {
        height: hp(150),
        width: wp(170),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#32CCC3',
      },
      boxRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: hp(20),
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
      boxText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'BalooBhai2-Bold',
      },
      mainBoxView: {
        flex: 1,
      },
      boxImage: {
        height: hp(55),
        width: wp(65),
      },
      bannerAds: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp(20),
      },
      bannerAdsView: {
        // flex: 1,
        marginVertical: 20,
        justifyContent: 'flex-end',
        alignSelf: 'center',
      },
      BigbannerAds: {
        justifyContent: 'center',
        alignSelf: 'center',
        // marginTop: hp(40),
      },
    });
  }, [hp, wp]);
  return style;
};
