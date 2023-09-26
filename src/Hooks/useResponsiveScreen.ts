import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

export const useResponsiveScreen = () => {
  const [currentOrientation, setCurrentOrientation] = useState<
    'portrait' | 'landscape'
  >('portrait');

  const DEFAULT_WIDTH = 414;
  const DEFAULT_HEIGHT = 896;

  useEffect(() => {
    lor(setCurrentOrientation);
    return () => {
      rol();
    };
  }, []);

  const wp = (width: number): number => {
    const percent = (width * 100) / DEFAULT_WIDTH;

    return widthPercentageToDP(percent);
  };
  const hp = (width: number): number => {
    const percent = (width * 100) / DEFAULT_HEIGHT;

    return heightPercentageToDP(percent);
  };

  return {
    wp,
    hp,
    ...Dimensions.get('window'),
    currentOrientation,
  };
};
