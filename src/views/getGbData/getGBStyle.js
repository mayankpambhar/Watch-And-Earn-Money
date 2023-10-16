import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useGetGbStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        flex: 1,
        backgroundColor: '#F7F7f4',
      },
      countryCodeView: {
        height: hp(50),
        marginHorizontal: wp(20),
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 3,
        paddingTop: 5,
      },
      dropDownContainer: {
        width: '88%',
        marginTop: hp(50),
        alignSelf: 'center',
      },
      topView: {
        marginTop: hp(40),
      },
      submit: {
        marginTop: hp(100),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(50),
        width: wp(200),
        borderRadius: hp(10),
        backgroundColor: '#32CCC3',
        zIndex: -2,
      },
      submitText: {
        fontSize: 19,
        fontFamily: 'BalooBhai2-SemiBold',
        color: '#000',
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
      error: {
        color: 'red',
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingLeft: wp(35),
        zIndex: -2,
      },
      boxImage: {
        height: hp(100),
        width: wp(130),
      },
      boxView: {
        alignItems: 'center',
        marginTop: hp(20),
      },
      bannerAds: {
        marginTop: hp(30),
        alignSelf: 'center',
        justifyContent: 'flex-end',
      },
    });
  }, [hp, wp]);
  return style;
};
