import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import {RewardedAds} from '../../helpers/ads';

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timer, setTimer] = useState(null);

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

  const showInterstitialAd = async () => {
    if (!disableButton) {
      try {
        await RewardedAds.show();
        setDisableButton(true);
        startTimer();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
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

      <Text style={styles.titleView}>Watch Ads To Get Coins</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.submit}
          onPress={showInterstitialAd}
          disabled={disableButton}>
          <Text style={styles.submitText}>
            {disableButton ? `Wait ${remainingTime}s` : 'Watch Ads'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WatchVideoScreen;
