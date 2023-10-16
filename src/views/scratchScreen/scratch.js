import {View, Image, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScratchCard} from 'rn-scratch-card';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useScratchStyle} from './scratchStyle';
import {useNavigation} from '@react-navigation/native';
import DialogBox from '../../components/dialog/DialogBox';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import InternetDialog from '../../components/internetDialo/InternetDialog';
import NetInfo from '@react-native-community/netinfo';

const ScratchPage = () => {
  const styles = useScratchStyle();
  const navigation = useNavigation();
  const [isScratch, setIsScratch] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [coins, setCoins] = useState(0);
  const [scratch, setScratch] = useState(0);
  const [clamModalVisible, setClamModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadADS, setLoadAds] = useState(false);
  const [rewardAdsId, setRewardAdsId] = useState('');
  const [isShowAds, setIsShowAds] = useState(false);
  const [rewardads, setrewardads] = useState();

  const [internetModalVisible, setInternetModalVisible] = useState(false);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;

  const scratchRef = database().ref(`Users/${uid}/scratch`);

  useEffect(() => {
    const rewardAdsRef = database().ref('Ads/Reward');
    rewardAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setRewardAdsId(dateValue);
    });
  }, [rewardAdsId]);

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
    const RewardedAds = RewardedAd.createForAdRequest(rewardAdsId, {
      requestNonPersonalizedAdsOnly: true,
    });
    setrewardads(RewardedAds);
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();
  }, [loadADS, rewardAdsId]);

  const showAds = () => {
    if (rewardads.loaded) {
      rewardads.show();
      const scratchValue = scratch + 1;
      scratchRef.set(scratchValue);
      setLoadAds(true);
      generateRandomNumber();
      const userRef = database().ref(`Users/${uid}/coins`);
      const coinsValue = coins + randomNumber;
      userRef.set(coinsValue);
      setIsScratch(false);
      setClamModalVisible(false);
    } else {
      loadAds();
    }
  };

  const loadAds = () => {
    rewardads.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    rewardads.load();
  };

  useEffect(() => {
    scratchRef.on('value', snapshot => {
      const dateValue = snapshot?.val();
      setScratch(dateValue);
    });
  }, [scratchRef, scratch]);

  useEffect(() => {
    if (currentUser) {
      fetchCoinsData(uid);
    }
  }, [currentUser, uid]);

  useEffect(() => {
    const showAdsRef = database().ref('IsAdsShow');
    showAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setIsShowAds(dateValue);
    });
  }, [isShowAds]);

  const fetchCoinsData = useId => {
    const userRef = database().ref(`Users/${useId}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      setCoins(coinsValue);
    });
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

  const handleClaim = () => {
    if (isShowAds) {
      showAds();
    } else {
      const userRef = database().ref(`Users/${uid}/coins`);
      const coinsValue = coins + randomNumber;
      userRef.set(coinsValue);
      const scratchValue = scratch + 1;
      scratchRef.set(scratchValue);
      setIsScratch(false);
      generateRandomNumber();
      setClamModalVisible(false);
    }
  };

  const generateRandomNumber = () => {
    const min = 1;
    const max = 7;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
  };
  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rupeeRow}>
        <Text style={styles.coin}>{coins}</Text>
        <Text style={styles.rupee}>₹</Text>
      </View>
      <DialogBox
        modalVisible={clamModalVisible}
        onClose={() => setClamModalVisible(false)}
        msg={'Congratulations !'}
        onPress={handleClaim}
      />

      <View style={styles.cardView}>
        <View style={styles.background_view}>
          <Image
            source={require('../../assets/Images/ic_scratch_bg.png')}
            style={styles.background_view}
          />
          <Text style={styles.rewardText}>{randomNumber}</Text>
        </View>
        {!isScratch ? (
          scratch < 10 ? (
            <ScratchCard
              source={require('../../assets/Images/ic_scratchcard_cover.png')}
              brushWidth={50}
              onScratch={handleScratch}
              style={styles.scratch_card}
            />
          ) : (
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}>
              <DialogBox
                modalVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                msg={'Reached Daily Limit\nFor Scratch'}
                onPress={handleContinue}
              />

              <Image
                source={require('../../assets/Images/ic_scratchcard_cover.png')}
                style={styles.scratch_card}
              />
            </Pressable>
          )
        ) : (
          <LottieView
            source={require('../../assets/lottie/scratch.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
        )}
      </View>
      <InternetDialog
        modalVisible={internetModalVisible}
        onClose={() => setInternetModalVisible(false)}
        msg={'No Internet Connection'}
        description={'Check your mobile data or \n Wi-Fi or Try again.'}
      />
    </View>
  );

  function handleScratch(scratchPercentage) {
    if (scratchPercentage === 100) {
      setTimeout(() => {
        setClamModalVisible(true);
      }, 1300);
      setIsScratch(true);
      loadAds();
    }
  }
};

export default ScratchPage;
