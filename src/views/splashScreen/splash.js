import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useSplashStyle} from './splashStyle';
import {AppOpenAd} from 'react-native-google-mobile-ads';
import NetInfo from '@react-native-community/netinfo';
import InternetDialog from '../../components/internetDialo/InternetDialog';

const Splash = () => {
  const navigation = useNavigation();
  const hasNavigatedRef = useRef(false);
  const styles = useSplashStyle();
  const [internetModalVisible, setInternetModalVisible] = useState(false);

  const defaultDate = date => (date ? moment(date).format('DD/MM/YY') : date);

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
    const showAdsRef = database().ref('IsAdsShow');
    showAdsRef.on('value', snapshot => {
      const adShowValue = snapshot.val();

      const appOpenAdsRef = database().ref('Ads/AppOpen');
      appOpenAdsRef.on('value', snapshot => {
        const snapshotValue = snapshot.val();
        const AppOpenAds = AppOpenAd.createForAdRequest(snapshotValue, {
          requestNonPersonalizedAdsOnly: true,
        });
        AppOpenAds.load();

        const unsubscribe = auth().onAuthStateChanged(
          async authenticatedUser => {
            if (authenticatedUser && !hasNavigatedRef.current) {
              hasNavigatedRef.current = true;

              try {
                const uid = authenticatedUser?.uid;
                const userRef = database().ref(`Users/${uid}`);
                const snapshotData = await userRef.once('value');
                if (!snapshotData.exists()) {
                  const userData = {
                    currentDate: defaultDate(Date.now()),
                    coins: 10,
                    scratch: 0,
                    watchAds: 0,
                    dailyCheck: false,
                    uid: uid,
                  };
                  userRef.set(userData);
                } else {
                  const currentDateRef = database().ref(
                    `Users/${uid}/currentDate`,
                  );
                  currentDateRef.on('value', snapshots => {
                    const dateValue = snapshots.val();
                    if (dateValue !== defaultDate(Date.now())) {
                      const scratchRef = database().ref(`Users/${uid}/scratch`);
                      const dailyCheckRef = database().ref(
                        `Users/${uid}/dailyCheck`,
                      );
                      const watchAdsRef = database().ref(
                        `Users/${uid}/watchAds`,
                      );
                      currentDateRef.set(defaultDate(Date.now()));
                      scratchRef.set(0);
                      watchAdsRef.set(0);
                      dailyCheckRef.set(false);
                    }
                  });
                }

                setTimeout(() => {
                  snapshotValue && AppOpenAds.loaded && adShowValue
                    ? AppOpenAds.show().then(() => {
                        navigation.replace('Home');
                      })
                    : navigation.replace('Home');
                }, 2500);
              } catch (error) {
                console.error('Error handling user data:', error);
              }
            } else if (!authenticatedUser && !hasNavigatedRef.current) {
              try {
                const {user} = await auth().signInAnonymously();
                const uid = user?.uid;

                const userRef = database().ref(`Users/${uid}`);
                const snapshotId = await userRef.once('value');
                if (!snapshotId.exists()) {
                  const userData = {
                    currentDate: defaultDate(Date.now()),
                    coins: 10,
                    scratch: 0,
                    watchAds: 0,
                    dailyCheck: false,
                    uid: uid,
                  };
                  userRef.set(userData);
                } else {
                  const currentDateRef = database().ref(
                    `Users/${uid}/currentDate`,
                  );
                  currentDateRef.on('value', snapshots => {
                    const dateValue = snapshots.val();
                    if (dateValue !== defaultDate(Date.now())) {
                      const scratchRef = database().ref(`Users/${uid}/scratch`);
                      const dailyCheckRef = database().ref(
                        `Users/${uid}/dailyCheck`,
                      );
                      const watchAdsRef = database().ref(
                        `Users/${uid}/watchAds`,
                      );
                      currentDateRef.set(defaultDate(Date.now()));
                      scratchRef.set(0);
                      watchAdsRef.set(0);
                      dailyCheckRef.set(false);
                    }
                  });
                }

                hasNavigatedRef.current = true;
                setTimeout(() => {
                  snapshotValue && AppOpenAds.loaded && adShowValue
                    ? AppOpenAds.show().then(() => {
                        navigation.replace('Home');
                      })
                    : navigation.replace('Home');
                }, 2500);
              } catch (error) {
                console.error('Error signing in anonymously:', error);
              }
            }
          },
        );
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      });
    });
  }, [navigation]);

  return (
    <View style={styles.mainView}>
      <Image
        style={styles.Imageicon}
        source={require('../../assets/Images/ic_appicon.png')}
      />
      <InternetDialog
        modalVisible={internetModalVisible}
        onClose={() => setInternetModalVisible(false)}
        msg={'No Internet Connection'}
        description={'Check your mobile data or \n Wi-Fi or Try again.'}
      />
    </View>
  );
};

export default Splash;
