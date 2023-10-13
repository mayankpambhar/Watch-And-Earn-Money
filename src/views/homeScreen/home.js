import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useHomeStyle} from './homeStyle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {BannerAds, RewardedAds} from '../../helpers/ads';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import {Toster} from '../../components/toster/toster';
import NetInfo from '@react-native-community/netinfo';
import InternetDialog from '../../components/internetDialo/InternetDialog';

const HomePage = ({navigation}) => {
  const styles = useHomeStyle();

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [isDailyCheck, setIsDailyCheck] = useState(false);
  const [bannerAdsId, setBannerAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [internetModalVisible, setInternetModalVisible] = useState(false);

  const currentUser = auth().currentUser;
  const userId = currentUser?.uid;

  const dailyCheckRef = database().ref(`Users/${userId}/dailyCheck`);
  const coinsRef = database().ref(`Users/${userId}/coins`);

  const checkInternetConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        setInternetModalVisible(false);
      } else {
        setInternetModalVisible(true);
      }
    } catch (error) {
      console.error(
        'An error occurred while checking the internet connection:',
        error,
      );
    }
  };
  useEffect(() => {
    checkInternetConnection();
    const intervalId = setInterval(checkInternetConnection, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const showAdsRef = database().ref('IsAdsShow');
    showAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setIsShowAds(dateValue);
    });
  }, [isShowAds]);

  useEffect(() => {
    const bannerAdsRef = database().ref('Ads/Banner');
    bannerAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setBannerAdsId(dateValue);
    });
  }, [bannerAdsId]);

  useEffect(() => {
    dailyCheckRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setIsDailyCheck(dateValue);
    });
  }, [dailyCheckRef]);

  useEffect(() => {
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);

      fetchCoinsData(currentUser.uid);
    }
  }, [currentUser]);

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
              if (isDailyCheck === false) {
                try {
                  isShowAds
                    ? RewardedAds.show()
                        .then(() => {
                          dailyCheckRef.set(true);
                          const coinValue = coins + 10;
                          coinsRef.set(coinValue);
                        })
                        .catch(() => {})
                    : dailyCheckRef.set(true);
                  const coinValue = coins + 10;
                  coinsRef.set(coinValue);
                } catch (error) {}
              } else {
                Toster('Already Redeem Daily Reward');
              }
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
      {isShowAds && (
        <View style={styles.bannerAds}>
          <BannerAds bannerId={bannerAdsId} />
        </View>
      )}
      <InternetDialog
        modalVisible={internetModalVisible}
        onClose={() => setInternetModalVisible(false)}
        msg={'No Internet Connection'}
        description={'Check your mobile data or \n Wi-Fi or Try again.'}
      />
    </SafeAreaView>
  );
};

export default HomePage;
