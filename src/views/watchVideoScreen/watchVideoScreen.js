import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Toster} from '../../components/toster/toster';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import NetInfo from '@react-native-community/netinfo';
import InternetDialog from '../../components/internetDialo/InternetDialog';
import {useNavigation} from '@react-navigation/native';
import DialogBox from '../../components/dialog/DialogBox';
import {BannerAds, LargeBannerAds} from '../../helpers/ads';

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const navigation = useNavigation();
  const [watchAds, setWatchAds] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timer, setTimer] = useState(null);
  const [rewardAdsId, setRewardAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [rewardads, setrewardads] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [bannerAdsId, setBannerAdsId] = useState('');

  const [internetModalVisible, setInternetModalVisible] = useState(false);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;
  const watchVideoRef = database().ref(`Users/${uid}/watchAds`);
  const coinsRef = database().ref(`Users/${uid}/coins`);

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

  // useEffect(() => {
  //   setDisableButton(true);
  //   startTimer();
  // }, []);

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
    console.log('useeffect    ' + RewardedAds.loaded);
  }, [rewardAdsId]);

  useEffect(() => {
    const bannerAdsRef = database().ref('Ads/Banner');
    bannerAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setBannerAdsId(dateValue);
    });
  }, [bannerAdsId]);

  const showAds = () => {
    if (!disableButton) {
      if (watchAds < 10) {
        try {
          if (rewardads.loaded) {
            rewardads.show().then(() => {
              const watchVideoValue = watchAds + 1;
              watchVideoRef.set(watchVideoValue);
              const coinValue = coins + 5;
              coinsRef.set(coinValue);
            });
            setDisableButton(true);
            startTimer();
          } else loadAds();
        } catch (error) {
          console.error('Error showing interstitial ad:', error);
        }
      } else {
        setModalVisible(true);
      }
    }
  };

  const loadAds = () => {
    rewardads.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    rewardads.load();
    console.log('load again   ' + rewardads.loaded);
    // showAds();
  };

  const showRewardAds = () => {
    if (isShowAds) {
      showAds();
      loadAds();
    } else {
      if (!disableButton) {
        if (watchAds < 10) {
          try {
            const watchVideoValue = watchAds + 1;
            watchVideoRef.set(watchVideoValue);
            const coinValue = coins + 5;
            coinsRef.set(coinValue);
            setDisableButton(true);
            startTimer();
          } catch (error) {
            console.error('Error showing interstitial ad:', error);
          }
        } else {
          setModalVisible(true);
        }
      }
    }
  };

  useEffect(() => {
    watchVideoRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setWatchAds(dateValue);
    });
  }, [watchVideoRef, watchAds]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);

      fetchCoinsData(uid);
    }
  }, [currentUser, uid]);

  const fetchCoinsData = userId => {
    const userRef = database().ref(`Users/${userId}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      setCoins(coinsValue);
    });
  };

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      rewardads.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
      rewardads.load();
      setRemainingTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          setDisableButton(false);
          return 5;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(timerInterval);
  };

  const handleContinue = () => {
    if (isShowAds) {
      if (rewardads.loaded) {
        rewardads.show();
        setModalVisible(false);
        navigation.navigate('Home');
      } else {
        loadAds();
      }
    } else {
      setModalVisible(false);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.coinView}>
        <Text style={styles.coinTextView}>{coins}</Text>
        <Text style={styles.rupee}>₹</Text>
      </View>

      <Text style={styles.titleView}>Watch Video To Get Coins</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.submit}
          onPress={showRewardAds}
          disabled={disableButton}>
          <Text style={styles.submitText}>
            {disableButton ? `Wait ${remainingTime}s` : 'Watch Video'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bannerAdsView}>
        {isShowAds && (
          <View style={styles.BigbannerAds}>
            <LargeBannerAds bannerId={bannerAdsId} />
          </View>
        )}
        {isShowAds && (
          <View style={styles.bannerAds}>
            <BannerAds bannerId={bannerAdsId} />
          </View>
        )}
      </View>

      <DialogBox
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        msg={'Reached Daily Limit For\nWatch Video'}
        onPress={handleContinue}
      />
      <InternetDialog
        modalVisible={internetModalVisible}
        onClose={() => setInternetModalVisible(false)}
        msg={'No Internet Connection'}
        description={'Check your mobile data or \n Wi-Fi or Try again.'}
      />
    </View>
  );
};

export default WatchVideoScreen;
