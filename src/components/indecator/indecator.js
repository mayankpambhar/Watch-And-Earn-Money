import {View} from 'react-native';
import React from 'react';
import {useLoadingIndecatorStyle} from './indecatorStyle';
import LottieView from 'lottie-react-native';

const LoadingIndecator = () => {
  const styles = useLoadingIndecatorStyle();
  return (
    <View style={styles.loadingView}>
      <LottieView
        source={require('../../assets/lottie/progress.json')}
        autoPlay
        loop={true}
        style={styles.lottieAnimation}
      />
    </View>
  );
};

export default LoadingIndecator;
