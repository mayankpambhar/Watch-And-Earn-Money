import React from 'react';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  TestIds,
} from 'react-native-google-mobile-ads';

export const BannerAds = () => {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-8908598255425255/5732094471';
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => console.log(error)}
    />
  );
};
const interstitialAdsUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8908598255425255/9739590429';
export const InterstitialAds = InterstitialAd.createForAdRequest(
  interstitialAdsUnitId,
  {
    requestNonPersonalizedAdsOnly: true,
  },
);

const rewardedAdUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8908598255425255/4062476503';

export const RewardedAds = RewardedAd.createForAdRequest(rewardedAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
