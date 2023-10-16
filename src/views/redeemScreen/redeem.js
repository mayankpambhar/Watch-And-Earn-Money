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
import {LargeBannerAds} from '../../helpers/ads';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Toster} from '../../components/toster/toster';
import NetInfo from '@react-native-community/netinfo';
import InternetDialog from '../../components/internetDialo/InternetDialog';
import DialogBox from '../../components/dialog/DialogBox';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import LoadingIndecator from '../../components/indecator/indecator';

const RedeemPage = ({navigation}) => {
  const styles = useRedeemStyle();
  const [coins, setCoins] = useState(0);
  const [internetModalVisible, setInternetModalVisible] = useState(false);
  const [bannerAdsId, setBannerAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [modalOneGBVisible, setModalOneGBVisible] = useState(false);
  const [modalTwoGBVisible, setModalTwoGBVisible] = useState(false);
  const [modalOneVisible, setModalOneVisible] = useState(false);
  const [modalTwoVisible, setModalTwoVisible] = useState(false);
  const [rewardAdsId, setRewardAdsId] = useState('');
  const [rewardads, setrewardads] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const showAdsRef = database().ref('IsAdsShow');
    showAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setIsShowAds(dateValue);
    });
  }, [isShowAds]);

  useEffect(() => {
    const rewardAdsRef = database().ref('Ads/Reward');
    rewardAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setRewardAdsId(dateValue);
    });
    const RewardedAds = RewardedAd.createForAdRequest(rewardAdsId, {
      requestNonPersonalizedAdsOnly: true,
    });
    setrewardads(RewardedAds);
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();
  }, [rewardAdsId]);

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
    const currentUser = auth().currentUser;
    if (currentUser) {
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
                  if (isShowAds) {
                    if (rewardads.loaded) {
                      setIsLoading(false);
                      rewardads.show().then(() => {
                        navigation.navigate('GetGb', {
                          data: 1,
                        });
                      });
                    } else {
                      setIsLoading(true);
                      rewardads.addAdEventListener(
                        RewardedAdEventType.EARNED_REWARD,
                        () => {},
                      );
                      rewardads.load();
                      setTimeout(() => {
                        if (rewardads.loaded) {
                          rewardads.show().then(() => {
                            setIsLoading(false);
                            navigation.navigate('GetGb', {
                              data: 1,
                            });
                          });
                        } else {
                          setIsLoading(false);
                          Toster('Please Try Again!');
                          rewardads.addAdEventListener(
                            RewardedAdEventType.EARNED_REWARD,
                            () => {},
                          );
                          rewardads.load();
                        }
                      }, 2000);
                    }
                  } else {
                    navigation.navigate('GetGb', {
                      data: 1,
                    });
                  }
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
                  if (isShowAds) {
                    if (rewardads.loaded) {
                      setIsLoading(false);
                      rewardads.show().then(() => {
                        navigation.navigate('GetGb', {
                          data: 2,
                        });
                      });
                    } else {
                      setIsLoading(true);
                      rewardads.addAdEventListener(
                        RewardedAdEventType.EARNED_REWARD,
                        () => {},
                      );
                      rewardads.load();
                      setTimeout(() => {
                        if (rewardads.loaded) {
                          rewardads.show().then(() => {
                            navigation.navigate('GetGb', {
                              data: 2,
                            });
                            setIsLoading(false);
                          });
                        } else {
                          setIsLoading(false);
                          Toster('Please Try Again!');
                          rewardads.addAdEventListener(
                            RewardedAdEventType.EARNED_REWARD,
                            () => {},
                          );
                          rewardads.load();
                        }
                      }, 2000);
                    }
                  } else {
                    navigation.navigate('GetGb', {
                      data: 2,
                    });
                  }
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
                  if (isShowAds) {
                    if (rewardads.loaded) {
                      setIsLoading(false);
                      rewardads.show().then(() => {
                        navigation.navigate('GetPlayCode', {
                          data: 1,
                        });
                      });
                    } else {
                      setIsLoading(true);
                      rewardads.addAdEventListener(
                        RewardedAdEventType.EARNED_REWARD,
                        () => {},
                      );
                      rewardads.load();
                      setTimeout(() => {
                        if (rewardads.loaded) {
                          rewardads.show().then(() => {
                            setIsLoading(false);
                            navigation.navigate('GetPlayCode', {
                              data: 1,
                            });
                          });
                        } else {
                          setIsLoading(false);
                          Toster('Please Try Again!');
                          rewardads.addAdEventListener(
                            RewardedAdEventType.EARNED_REWARD,
                            () => {},
                          );
                          rewardads.load();
                        }
                      }, 2000);
                    }
                  } else {
                    navigation.navigate('GetPlayCode', {
                      data: 1,
                    });
                  }
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
                  if (isShowAds) {
                    if (rewardads.loaded) {
                      setIsLoading(false);
                      rewardads.show().then(() => {
                        navigation.navigate('GetPlayCode', {
                          data: 2,
                        });
                      });
                    } else {
                      setIsLoading(true);
                      rewardads.addAdEventListener(
                        RewardedAdEventType.EARNED_REWARD,
                        () => {},
                      );
                      rewardads.load();
                      setTimeout(() => {
                        if (rewardads.loaded) {
                          rewardads.show().then(() => {
                            setIsLoading(false);
                            navigation.navigate('GetPlayCode', {
                              data: 2,
                            });
                          });
                        } else {
                          setIsLoading(false);
                          Toster('Please Try Again!');
                          rewardads.addAdEventListener(
                            RewardedAdEventType.EARNED_REWARD,
                            () => {},
                          );
                          rewardads.load();
                        }
                      }, 2000);
                    }
                  } else {
                    navigation.navigate('GetPlayCode', {
                      data: 2,
                    });
                  }
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
          </View>
        </View>
        {isLoading && <LoadingIndecator />}
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
