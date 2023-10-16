import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useGetPlayCodeStyle} from './getPlayCodeStyle';
import TextInputField from '../../components/textInput/textInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import DialogBox from '../../components/dialog/DialogBox';
import moment from 'moment';
import {LargeBannerAds} from '../../helpers/ads';

const user = auth().currentUser;
const uid = user?.uid;

const GetPlayCode = () => {
  const {
    params: {data},
  } = useRoute();
  const navigation = useNavigation();
  const [email, setNumber] = useState('');
  const [inputError, setInputError] = useState('');
  const styles = useGetPlayCodeStyle();
  const [coins, setCoins] = useState(0);
  const [isShowAds, setIsShowAds] = useState(false);
  const [rewardAdsId, setRewardAdsId] = useState('');
  const [rewardads, setrewardads] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [bannerAdsId, setBannerAdsId] = useState('');

  const defaultDate = date => (date ? moment(date).format('DD/MM/YY') : date);

  useEffect(() => {
    const showAdsRef = database().ref('IsAdsShow');
    showAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setIsShowAds(dateValue);
    });
  }, [isShowAds]);

  useEffect(() => {
    const bannerAdsRef = database().ref('Ads/Banner');
    bannerAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setBannerAdsId(dateValue);
    });
  }, [bannerAdsId]);

  useEffect(() => {
    const rewardAdsRef = database().ref('Ads/Reward');
    rewardAdsRef.on('value', snapshot => {
      const dateValue = snapshot.val();
      setRewardAdsId(dateValue);
    });
    const RewardedAds = RewardedAd.createForAdRequest(rewardAdsId, {
      requestNonPersonalizedAdsOnly: true,
    });
    setrewardads(RewardedAds);
    RewardedAds.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    RewardedAds.load();
  }, [rewardAdsId]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      fetchCoinsData(currentUser.uid);
    }
  }, []);

  const fetchCoinsData = userId => {
    const userRef = database().ref(`Users/${userId}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      setCoins(coinsValue);
    });
  };
  const redeemData = () => {
    const amount = data === 1 ? 10 : 25;
    const redeemValue = {
      email: email,
      redeemAmount: amount + ' ₹',
      currentDate: defaultDate(Date.now()),
    };

    const redeemRef = database().ref(`RedeemPlayCode/${uid}`);
    const userRef = database().ref(`Users/${uid}/coins`);

    const coinsValue = data === 1 ? coins - 150 : coins - 300;
    userRef.set(coinsValue);

    redeemRef.push(redeemValue).then(() => {
      navigation.navigate('Home');
    });
  };

  const onSubmitPress = () => {
    Keyboard.dismiss();
    if (email.length === 0) {
      setInputError('Enter valid email');
    } else if (!isValidEmail(email)) {
      setInputError('Enter a valid email address');
    } else {
      setModalVisible(true);
    }
  };

  function isValidEmail(emails) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emails);
  }

  const loadAds = () => {
    rewardads.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {});
    rewardads.load();
  };

  const handleContinue = () => {
    if (isShowAds) {
      if (rewardads.loaded) {
        rewardads.show();
        setModalVisible(false);
        redeemData();
      } else {
        loadAds();
      }
    } else {
      setModalVisible(false);
      redeemData();
    }
  };

  return (
    <ScrollView style={styles.mainView}>
      <KeyboardAvoidingView
        style={styles.keyBordView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.mainView}>
            <View style={styles.rupeeRow}>
              <Text style={styles.coin}>{coins}</Text>
              <Text style={styles.rupee}>₹</Text>
            </View>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={
                  data === 1
                    ? require('../../assets/Images/ic_10playredeemCode.png')
                    : require('../../assets/Images/ic_25playredeemCode.png')
                }
                resizeMode="contain"
              />
            </View>
            <View style={styles.topView}>
              <TextInputField
                isShow={false}
                value={email}
                placeholder={'Enter Your Email id'}
                error={inputError}
                keyboardType={'email-address'}
                onChangeText={e => {
                  setNumber(e);
                  if (isValidEmail(e)) {
                    setInputError('');
                  }
                }}
              />
              <TouchableOpacity
                style={styles.submit}
                onPress={() => {
                  onSubmitPress();
                }}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
            {isShowAds && (
              <View style={styles.BigbannerAds}>
                <LargeBannerAds bannerId={bannerAdsId} />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <DialogBox
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        msg={'Coupon Will Send On Your\n Email in 24 Hours'}
        onPress={handleContinue}
      />
    </ScrollView>
  );
};

export default GetPlayCode;
