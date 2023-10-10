import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import {RewardedAds} from '../../helpers/ads';
import {Toster} from '../../components/toster/toster';

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [watchAds, setWatchAds] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timer, setTimer] = useState(null);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;
  const watchVideoRef = database().ref(`Users/${uid}/watchAds`);
  const coinsRef = database().ref(`Users/${uid}/coins`);

  useEffect(() => {
    watchVideoRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setWatchAds(dateValue);
    });
  }, [watchVideoRef, watchAds]);

  useEffect(() => {
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();
  }, []);

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

  const showInterstitialAd = async () => {
    if (!disableButton) {
      if (watchAds < 1) {
        try {
          await RewardedAds.show().then(() => {
            const watchVideoValue = watchAds + 1;
            watchVideoRef.set(watchVideoValue);
            const coinValue = coins + 5;
            coinsRef.set(coinValue);
          });
          setDisableButton(true);
          startTimer();
        } catch (error) {
          console.error('Error showing interstitial ad:', error);
        }
      } else {
        Toster('Kal avjo');
      }
    }
  };

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      RewardedAds.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {},
      );
      RewardedAds.load();
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
          onPress={showInterstitialAd}
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
