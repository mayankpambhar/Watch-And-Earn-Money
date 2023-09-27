import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {ScratchCard} from 'rn-scratch-card';

import {useScratchStyle} from './scratchStyle';

const ScratchPage = () => {
  const styles = useScratchStyle();
  const [isScratch, setIsScratch] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Images/scratch_background.png')}
        style={styles.background_view}
      />
      {!isScratch ? (
        <ScratchCard
          source={require('../../assets/Images/scratch_foreground.png')}
          brushWidth={50}
          onScratch={handleScratch}
          style={styles.scratch_card}
        />
      ) : null}
    </View>
  );
  function handleScratch(scratchPercentage) {
    if (scratchPercentage === 100) {
      setIsScratch(true);
    }
    console.log(scratchPercentage);
  }
};

export default ScratchPage;
