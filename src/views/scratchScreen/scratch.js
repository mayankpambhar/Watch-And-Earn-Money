import {View, Image, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScratchCard} from 'rn-scratch-card';
import LottieView from 'lottie-react-native';

import {useScratchStyle} from './scratchStyle';

const ScratchPage = () => {
  const styles = useScratchStyle();
  const [isScratch, setIsScratch] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 10;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
  };
  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <View style={styles.container}>
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
  );
  function handleScratch(scratchPercentage) {
    if (scratchPercentage === 100) {
      setIsScratch(true);
    }
  }
};

export default ScratchPage;
