import React from 'react';
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

// const interstitialAdsUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-8908598255425255/9739590429';
// export const InterstitialAds = InterstitialAd.createForAdRequest(
//   interstitialAdsUnitId,
//   {
//     requestNonPersonalizedAdsOnly: true,
//   },
// );

const rewardedAdUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8908598255425255/4062476503';

export const RewardedAds = RewardedAd.createForAdRequest(rewardedAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
