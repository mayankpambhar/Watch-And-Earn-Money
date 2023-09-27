import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useOneGbStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        height: '100%',
        width: '100%',
      },
      countryCodeView: {
        height: hp(50),
        marginHorizontal: wp(20),
        backgroundColor: '#F7F7f4',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingStart: 3,
        paddingTop: 5,
      },
    });
  }, [hp, wp]);
  return style;
};
