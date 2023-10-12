import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useResponsiveScreen} from '../../Hooks/useResponsiveScreen';

export const useInternetDialogStyle = () => {
  const {hp, wp} = useResponsiveScreen();

  const style = useMemo(() => {
    return StyleSheet.create({
      modalView: {
        margin: hp(20),
        backgroundColor: 'white',
        borderRadius: hp(20),
        padding: hp(35),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: hp(0),
          height: hp(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: hp(4),
        elevation: 5,
      },
      modalText: {
        marginBottom: hp(10),
        textAlign: 'center',
        fontFamily: 'Baloobhai2-Bold',
        color: 'black',
      },
      modalDescText: {
        marginBottom: hp(12),
        textAlign: 'center',
        fontFamily: 'BalooBhai2-SemiBold',
        color: '#464646',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(22),
      },
      noinernetImage: {
        height: hp(80),
        width: wp(80),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      nointernetImageView: {
        height: hp(100),
        width: wp(100),
      },
    });
  }, [hp, wp]);
  return style;
};
