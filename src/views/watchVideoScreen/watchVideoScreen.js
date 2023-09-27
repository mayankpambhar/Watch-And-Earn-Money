import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useWatchAndEarnStyle} from './WatchVideoScreenStle';

const WatchVideoScreen = () => {
  const styles = useWatchAndEarnStyle();

  return (
    <View style={styles.mainView}>
      <Text style={styles.coinTextView}>4000</Text>
      <Text style={styles.titleView}>Watch Ads To Get Coins</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.submit} onPress={() => {}}>
          <Text style={styles.submitText}>Watch Ads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WatchVideoScreen;
