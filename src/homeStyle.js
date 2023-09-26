import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from './Hooks/useResponsiveScreen';

export const useHomeStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
      },
      coinComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(261),
        backgroundColor: 'yellow',
        borderBottomLeftRadius: wp(50),
        borderBottomRightRadius: wp(50),
      },
      boxView: {
        height: hp(150),
        width: wp(170),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'red',
      },
      boxRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: hp(30),
      },
      boxText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: hp(2),
        color: 'white',
        fontFamily: 'InknutAntiqua-Bold',
      },
      myCoin: {
        fontSize: 30,
        fontFamily: 'InknutAntiqua-Bold',
      },
      coin: {
        fontFamily: 'InknutAntiqua-Bold',
        fontSize: 25,
      },
      mainBoxView: {
        flex: 1,
      },
      boxImage: {
        height: hp(7),
        width: wp(20),
      },
    });
  }, [hp, wp]);
  return style;
};
