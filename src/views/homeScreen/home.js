import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useHomeStyle} from './homeStyle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {BannerAds, RewardedAds} from '../../helpers/ads';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';

const HomePage = ({navigation}) => {
  const styles = useHomeStyle();

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();

    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);

      fetchCoinsData(currentUser.uid);
    }
  }, []);

  const fetchCoinsData = uid => {
    const userRef = database().ref(`Users/${uid}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      console.log('coinccccccccccsValue: ', coinsValue);
      setCoins(coinsValue);
    });
  };

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
          <Text style={styles.coin}>{coins}</Text>
          <Text style={styles.rupee}>₹</Text>
        </View>
      </View>
      <View style={styles.mainBoxView}>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              try {
                RewardedAds.show();
              } catch (error) {}
            }}>
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
      <View style={styles.bannerAds}>
        <BannerAds />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
