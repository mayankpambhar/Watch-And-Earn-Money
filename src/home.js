import { View, Text } from 'react-native';
import React from 'react';
import {useHomeStyle} from './homeStyle';

const HomePage = () => {
  const styles = useHomeStyle();
  const squareBox = () => {
    return (
      <View style={styles.boxView}>
        <Text>230</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.coinComponent}>
        <Text>My Coins</Text>
        <Text>5000</Text>
      </View>
      <View style={styles.boxRow}>
        {squareBox()}
        {squareBox()}
      </View>
    </View>
  );
};

export default HomePage;
