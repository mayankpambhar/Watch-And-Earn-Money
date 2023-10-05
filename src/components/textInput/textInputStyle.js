import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useTextInputStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      countryCodeView: {
        width: '85%',
        fontSize: 20,
        fontFamily: 'BalooBhai2-SemiBold',
        marginLeft: wp(10),
        letterSpacing: wp(2),
        top: hp(3),
      },
      MainView: {
        marginHorizontal: wp(25),
      },
      mainFieldStyle: {
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: wp(7),
        flexDirection: 'row',
        height: hp(60),
        alignItems: 'center',
      },
      code: {
        letterSpacing: wp(2),
        fontSize: 20,
        paddingLeft: wp(20),
        color: '#000000',
        fontFamily: 'BalooBhai2-Bold',
      },
      error: {
        color: 'red',
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingLeft: wp(10),
      },
    });
  }, [hp, wp]);
  return style;
};
