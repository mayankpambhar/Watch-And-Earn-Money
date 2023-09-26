import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from './Hooks/useResponsiveScreen';

export const useHomeStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      mainView: {
        flex: 1,
      },
      coinComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '100%',
        backgroundColor: 'yellow',
        // paddingBottom: hp(20),
      },
      boxView: {
        height: hp(170),
        width: wp(170),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'red',
      },
      boxRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
    });
  }, [hp, wp]);
  return style;
};
