import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useScratchStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        alignSelf: 'center',
      },
      background_view: {
        position: 'absolute',
        width: wp(320),
        height: hp(320),
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 16,
      },
      scratch_card: {
        alignSelf: 'center',
        width: wp(320),
        height: hp(320),
        backgroundColor: 'transparent',
      },
    });
  }, [hp, wp]);
  return style;
};
