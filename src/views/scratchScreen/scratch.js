import {View, Image, Text, Modal, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScratchCard} from 'rn-scratch-card';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useScratchStyle} from './scratchStyle';
import {useNavigation} from '@react-navigation/native';
import {Toster} from '../../components/toster/toster';

const ScratchPage = () => {
  const styles = useScratchStyle();
  const navigation = useNavigation();
  const [isScratch, setIsScratch] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [scratch, setScratch] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;

  const scratchRef = database().ref(`Users/${uid}/scratch`);

  useEffect(() => {
    scratchRef.on('value', snapshot => {
      const dateValue = snapshot?.val();
      setScratch(dateValue);
    });
  }, [scratchRef, scratch]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);

      fetchCoinsData(uid);
    }
  }, [currentUser, uid]);

  const fetchCoinsData = useId => {
    const userRef = database().ref(`Users/${useId}/coins`);
    userRef.on('value', snapshot => {
      const coinsValue = snapshot.val();
      setCoins(coinsValue);
    });
  };

  const generateRandomNumber = () => {
    const min = 1;
    const max = 8;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
  };
  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rupeeRow}>
        <Text style={styles.coin}>{coins}</Text>
        <Text style={styles.rupee}>₹</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Congratulations !</Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
                const userRef = database().ref(`Users/${uid}/coins`);

                const coinsValue = coins + randomNumber;
                userRef.set(coinsValue);
                navigation.navigate('Home');
              }}>
              <Text style={styles.textStyle}>Claim</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.cardView}>
        <View style={styles.background_view}>
          <Image
            source={require('../../assets/Images/ic_scratch_bg.png')}
            style={styles.background_view}
          />
          <Text style={styles.rewardText}>{randomNumber}</Text>
        </View>
        {!isScratch ? (
          scratch < 1 ? (
            <ScratchCard
              source={require('../../assets/Images/ic_scratchcard_cover.png')}
              brushWidth={50}
              onScratch={handleScratch}
              style={styles.scratch_card}
            />
          ) : (
            <Pressable onPress={() => Toster('Kal avjo')}>
              <Image
                source={require('../../assets/Images/ic_scratchcard_cover.png')}
                style={styles.scratch_card}
              />
            </Pressable>
          )
        ) : (
          <LottieView
            source={require('../../assets/lottie/scratch.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
        )}
      </View>
    </View>
  );

  function handleScratch(scratchPercentage) {
    if (scratchPercentage === 100) {
      const scratchValue = scratch + 1;
      scratchRef.set(scratchValue);
      setModalVisible(true);
      setIsScratch(true);
    }
  }
};

export default ScratchPage;
