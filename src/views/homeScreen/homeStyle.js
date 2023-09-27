import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useHomeStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
      },
      coinComponent: {
        alignItems: 'center',
        height: hp(261),
        backgroundColor: '#32CCC3',
        borderBottomLeftRadius: wp(40),
        borderBottomRightRadius: wp(40),
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
        paddingTop: hp(30),
      },
      boxText: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'BalooBhai2-Bold',
      },
      myCoin: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'BalooBhai2-Bold',
        marginTop: hp(30),
      },
      coin: {
        fontFamily: 'BalooBhai2-Bold',
        fontSize: 25,
        color: 'black',
        marginTop: hp(-5),
      },
      mainBoxView: {
        flex: 1,
      },
      boxImage: {
        height: hp(55),
        width: wp(65),
      },
      settingImage: {
        height: hp(30),
        width: wp(30),
        alignSelf: 'flex-end',
        marginRight: wp(20),
        marginTop: hp(10),
      },
      rupeeRow: {
        flexDirection: 'row',
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
