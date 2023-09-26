import {View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useHomeStyle} from './homeStyle';

const HomePage = () => {
  const styles = useHomeStyle();

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor={'#32CCC3'} />
      <View style={styles.coinComponent}>
        <Image
          style={styles.settingImage}
          source={require('./assets/Images/ic_setting.png')}
          resizeMode="contain"
        />
        <Text style={styles.myCoin}>My Coins</Text>
        <View style={styles.rupeeRow}>
          <Text style={styles.coin}>5000</Text>
          <Text style={styles.rupee}>₹</Text>
        </View>
      </View>
      <View style={styles.mainBoxView}>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('./assets/Images/ic_bonus.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('./assets/Images/ic_spin_wheel.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Spinner</Text>
          </View>
        </View>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('./assets/Images/ic_watchearn.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Watch And Earn</Text>
          </View>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('./assets/Images/ic_wallet.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Redeem</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
