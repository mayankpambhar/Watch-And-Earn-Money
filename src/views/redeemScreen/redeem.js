import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRedeemStyle} from './redeemStyle';
import {BannerAds, LargeBannerAds, RewardedAds} from '../../helpers/ads';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import {Toster} from '../../components/toster/toster';
import NetInfo from '@react-native-community/netinfo';
import InternetDialog from '../../components/internetDialo/InternetDialog';
import DialogBox from '../../components/dialog/DialogBox';

const RedeemPage = ({navigation}) => {
  const styles = useRedeemStyle();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [internetModalVisible, setInternetModalVisible] = useState(false);
  const [bannerAdsId, setBannerAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [modalOneGBVisible, setModalOneGBVisible] = useState(false);
  const [modalTwoGBVisible, setModalTwoGBVisible] = useState(false);
  const [modalOneVisible, setModalOneVisible] = useState(false);
  const [modalTwoVisible, setModalTwoVisible] = useState(false);

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
      <ScrollView>
        <View style={styles.mainBoxView}>
          <View style={styles.rupeeRow}>
            <Text style={styles.coin}>{coins}</Text>
            <Text style={styles.rupee}>₹</Text>
          </View>
          <View style={styles.boxRow}>
            <TouchableOpacity
              onPress={() => {
                Toster('Comming Soon');
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
                Toster('Comming Soon');
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
                  setModalOneGBVisible(true);
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
            <DialogBox
              modalVisible={modalOneGBVisible}
              onClose={() => setModalOneGBVisible(false)}
              msg={'Need 350 Coins To Redeem'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (coins < 500) {
                  setModalTwoGBVisible(true);
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
            <DialogBox
              modalVisible={modalTwoGBVisible}
              onClose={() => setModalTwoGBVisible(false)}
              msg={'Need 500 Coins To Redeem'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
          <View style={styles.boxRow}>
            <TouchableOpacity
              onPress={() => {
                if (coins < 150) {
                  setModalOneVisible(true);
                } else {
                  navigation.navigate('GetPlayCode', {
                    data: 1,
                  });
                }
              }}>
              <View style={styles.boxView}>
                <Image
                  style={styles.boxImage}
                  source={require('../../assets/Images/ic_10playredeemCode.png')}
                  resizeMode="contain"
                />
                <Text style={styles.boxText}>{'Get 10₹\nRedeem Code'}</Text>
              </View>
            </TouchableOpacity>
            <DialogBox
              modalVisible={modalOneVisible}
              onClose={() => setModalOneVisible(false)}
              msg={'Need 150 Coins To Redeem'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (coins < 300) {
                  setModalTwoVisible(true);
                } else {
                  navigation.navigate('GetPlayCode', {
                    data: 2,
                  });
                }
              }}>
              <View style={styles.boxView}>
                <Image
                  style={styles.boxImage}
                  source={require('../../assets/Images/ic_25playredeemCode.png')}
                  resizeMode="contain"
                />
                <Text style={styles.boxText}>{'Get 25₹\nRedeem Code'}</Text>
              </View>
            </TouchableOpacity>
            <DialogBox
              modalVisible={modalTwoVisible}
              onClose={() => setModalTwoVisible(false)}
              msg={'Need 300 Coins To Redeem'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
          <View style={styles.bannerAdsView}>
            {isShowAds && (
              <View style={styles.BigbannerAds}>
                <LargeBannerAds bannerId={bannerAdsId} />
              </View>
            )}
            {/* {isShowAds && (
              <View style={styles.bannerAds}>
                <BannerAds bannerId={bannerAdsId} />
              </View>
            )} */}
          </View>
        </View>

        <InternetDialog
          modalVisible={internetModalVisible}
          onClose={() => setInternetModalVisible(false)}
          msg={'No Internet Connection'}
          description={'Check your mobile data or \n Wi-Fi or Try again.'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RedeemPage;
