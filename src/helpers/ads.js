import React from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

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
  return bannerId ? (
    <BannerAd
      unitId={bannerId}
      size={BannerAdSize.MEDIUM_RECTANGLE}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => console.log(error)}
    />
  ) : null;
};
