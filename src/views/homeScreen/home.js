import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useHomeStyle} from './homeStyle';

const HomePage = ({navigation}) => {
  const styles = useHomeStyle();

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.coinComponent}>
        <Image
          style={styles.settingImage}
          source={require('../../assets/Images/ic_setting.png')}
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
          <TouchableOpacity>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_bonus.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Daily Check</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Scratch');
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_scratch.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Scratch</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('watchVideoScreen');
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_watchearn.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Watch And Earn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Redeem');
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_wallet.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>Redeem</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
