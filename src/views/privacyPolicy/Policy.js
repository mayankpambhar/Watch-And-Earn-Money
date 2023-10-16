import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState('');
  useEffect(() => {
    const policyRef = database().ref('PrivacyPolicy');
    policyRef.on('value', snapshot => {
      const policyValue = snapshot.val();
      setPolicy(policyValue);
    });
  }, []);

  return policy ? (
    <WebView
      source={{
        uri: policy,
      }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      scalesPageToFit={true}
      style={styles.webView}
      showsHorizontalScrollIndicator={false}
    />
  ) : null;
};
const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default PrivacyPolicy;
