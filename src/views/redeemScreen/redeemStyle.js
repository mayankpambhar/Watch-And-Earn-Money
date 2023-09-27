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
    });
  }, [hp, wp]);
  return style;
};
