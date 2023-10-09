import {View, Image, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScratchCard} from 'rn-scratch-card';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useScratchStyle} from './scratchStyle';

const ScratchPage = () => {
  const styles = useScratchStyle();
  const [isScratch, setIsScratch] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);

      fetchCoinsData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchCoinsData = useId => {
    const userRef = database().ref(`Users/${useId}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      console.log('coinccccccccccsValue: ', coinsValue);
      setCoins(coinsValue);
    });
  };

  const generateRandomNumber = () => {
    const min = 1;
    const max = 8;
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
      <View style={styles.cardView}>
        <View style={styles.background_view}>
          <Image
            source={require('../../assets/Images/ic_scratch_bg.png')}
            style={styles.background_view}
          />
          <Text style={styles.rewardText}>{randomNumber}</Text>
        </View>
        {!isScratch ? (
          <ScratchCard
            source={require('../../assets/Images/ic_scratchcard_cover.png')}
            brushWidth={50}
            onScratch={handleScratch}
            style={styles.scratch_card}
          />
        ) : (
          <LottieView
            source={require('../../assets/lottie/scratch.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
        )}
      </View>
    </View>
  );
  function handleScratch(scratchPercentage) {
    if (scratchPercentage === 100) {
      setIsScratch(true);
      const userRef = database().ref(`Users/${uid}/coins`);

      const coinsValue = coins + randomNumber;
      userRef.set(coinsValue);
    }
  }
};

export default ScratchPage;
