import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRedeemStyle} from './redeemStyle';
import {RewardedAds} from '../../helpers/ads';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';

const RedeemPage = ({navigation}) => {
  const styles = useRedeemStyle();
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
      setCoins(coinsValue);
    });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.mainBoxView}>
        <View style={styles.rupeeRow}>
          <Text style={styles.coin}>{coins}</Text>
          <Text style={styles.rupee}>₹</Text>
        </View>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'Comming Soon',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_amazon.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Amazon Gift\nCard'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'Comming Soon',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_Flipkart.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Flipkart Gift\nCard'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              if (coins < 350) {
                ToastAndroid.showWithGravity(
                  'Need 350 Coins To Redeem',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              } else {
                navigation.navigate('GetGb', {
                  data: 1,
                });
              }
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_1gb.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Get 1GB\nData'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (coins < 500) {
                ToastAndroid.showWithGravity(
                  'Need 500 Coins To Redeem',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              } else {
                navigation.navigate('GetGb', {
                  data: 2,
                });
              }
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_2gb.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Get 2GB\nData'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RedeemPage;
