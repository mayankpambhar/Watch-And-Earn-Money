import {View, Text, Image} from 'react-native';
import React from 'react';
import {useHomeStyle} from './homeStyle';

const HomePage = () => {
  const styles = useHomeStyle();

  return (
    <View style={styles.mainView}>
      <View style={styles.coinComponent}>
        <Text style={styles.myCoin}>My Coins</Text>
        <Text style={styles.coin}>5000</Text>
      </View>
      <View style={styles.mainBoxView}>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
          <View style={styles.boxView}>
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
        </View>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
          <View style={styles.boxView}>
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
