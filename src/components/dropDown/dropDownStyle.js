import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useDropDownStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const styles = useMemo(() => {
    return StyleSheet.create({
      label: {
        alignSelf: 'flex-start',
      },
      requiredField: {
        color: '#000',
        fontFamily: 'BalooBhai2-Bold',
      },
      dropDownSearch: {
        borderBottomWidth: wp(1),
        borderColor: '#000',
      },
      dropDownContainer: {
        borderWidth: 1,
        borderRadius: hp(8),
        borderColor: '#000',
      },
      placeholder: {
        color: '#000',
        fontFamily: 'BalooBhai2-Bold',
      },
      arrowIcon: {
        tintColor: '#000',
      },
      dropDownText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'BalooBhai2-Bold',
      },
    });
  }, [wp, hp]);
  return styles;
};
