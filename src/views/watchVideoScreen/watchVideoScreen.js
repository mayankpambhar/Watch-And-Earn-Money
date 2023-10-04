import {View, Text, TouchableOpacity, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coins, setCoins] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    const unsubscribe = interstitial?.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    interstitial.load();

    return unsubscribe;
  }, [loaded]);

  const showInterstitialAd = async () => {
    if (loaded && !disableButton) {
      try {
        await interstitial.show();
        setLoaded(false);
        setDisableButton(true);
        startTimer();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    } else {
      const unsubscribe = interstitial?.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setLoaded(true);
        },
      );
      try {
        await interstitial.load();
        setLoaded(false);
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
      return unsubscribe;
    }
  };

  const startTimer = () => {
    const timerInterval = setInterval(() => {
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
