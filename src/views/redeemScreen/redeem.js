import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useRedeemStyle} from './redeemStyle';
// import {useHomeStyle} from '../homeScreen/homeStyle';

const RedeemPage = () => {
  const styles = useRedeemStyle();

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.mainBoxView}>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('../../assets/Images/ic_bonus.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Daily Check</Text>
          </View>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('../../assets/Images/ic_spin_wheel.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Spinner</Text>
          </View>
        </View>
        <View style={styles.boxRow}>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('../../assets/Images/ic_watchearn.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Watch And Earn</Text>
          </View>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={require('../../assets/Images/ic_wallet.png')}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>Redeem</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RedeemPage;
