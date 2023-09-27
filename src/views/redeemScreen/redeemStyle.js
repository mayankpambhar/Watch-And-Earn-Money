import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../hooks/useResponsiveScreen';

export const useRedeemStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
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
        fontSize: 16,
        color: 'black',
        fontFamily: 'BalooBhai2-Bold',
      },
      coin: {
        fontFamily: 'BalooBhai2-Bold',
        fontSize: 25,
        color: 'black',
        marginTop: hp(-25),
      },
      mainBoxView: {
        flex: 1,
      },
      boxImage: {
        height: hp(45),
        width: wp(45),
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
        marginLeft: wp(15),
        fontWeight: 'bold',
        marginTop: hp(-5),
      },
    });
  }, [hp, wp]);
  return style;
};
