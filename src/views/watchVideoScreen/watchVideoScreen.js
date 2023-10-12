import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Toster} from '../../components/toster/toster';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
// import NetInfo from '@react-native-community/netinfo';
// import {useNetInfo} from '@react-native-community/netinfo';

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [watchAds, setWatchAds] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timer, setTimer] = useState(null);
  const [rewardAdsId, setRewardAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [rewardads, setrewardads] = useState();

  // const netInfo = useNetInfo();

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;
  const watchVideoRef = database().ref(`Users/${uid}/watchAds`);
  const coinsRef = database().ref(`Users/${uid}/coins`);

  // const checkInternetConnection = async () => {
  //   try {
  //     const state = await netInfo.fetch();
  //     if (state.isConnected) {
  //       console.log('You are online.');
  //     } else {
  //       console.log('You are offline.');
  //     }
  //   } catch (error) {
  //     console.error(
  //       'An error occurred while checking the internet connection:',
  //       error,
  //     );
  //   }
  // };
  // useEffect(() => {
  //   checkInternetConnection();
  //   const intervalId = setInterval(checkInternetConnection, 100);
  //   return () => clearInterval(intervalId);
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
        Toster('Reached Daily Limit For Watch Video');
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
          Toster('Reached Daily Limit For Watch Video');
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
    </View>
  );
};

export default WatchVideoScreen;
