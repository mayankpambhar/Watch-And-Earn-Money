import React, {useEffect, useRef} from 'react';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const currentUser = auth().currentUser;
const userId = currentUser?.uid;

const rewardAdsRef = database().ref('Ads/Reward');

export const BannerAds = ({bannerId}) => {
  return bannerId ? (
    <BannerAd
      unitId={bannerId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => console.log(error)}
    />
  ) : null;
};

export const LargeBannerAds = ({bannerId}) => {
  console.log('bannerrrrrrrrrrr  iddddddcdddddddddd' + bannerId);
  return bannerId ? (
    <BannerAd
      unitId={'ca-app-pub-3940256099942544/6300978111'}
      size={BannerAdSize.MEDIUM_RECTANGLE}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => console.log(error)}
    />
  ) : null;
};

// const interstitialAdsUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-8908598255425255/9739590429';
// export const InterstitialAds = InterstitialAd.createForAdRequest(
//   interstitialAdsUnitId,
//   {
//     requestNonPersonalizedAdsOnly: true,
//   },
// );
