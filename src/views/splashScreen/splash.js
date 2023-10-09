import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
      if (authenticatedUser && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;

        try {
          const uid = authenticatedUser?.uid;
          const userRef = database().ref(`Users/${uid}`);
          const snapshot = await userRef.once('value');

          if (!snapshot.exists()) {
            const userData = {
              coins: 10,
              scratch: 0,
              watchAds: 0,
              uid: uid,
            };
            await userRef.set(userData);
          }

          setTimeout(() => {
            navigation.replace('Home');
          }, 2000);
        } catch (error) {
          console.error('Error handling user data:', error);
        }
      } else if (!authenticatedUser && !hasNavigatedRef.current) {
        try {
          const {user} = await auth().signInAnonymously();
          const uid = user?.uid;

          const userRef = database().ref(`Users/${uid}`);
          const snapshot = await userRef.once('value');
          if (!snapshot.exists()) {
            const userData = {
              coins: 10,
              scratch: 0,
              watchAds: 0,
              uid: uid,
            };
            await userRef.set(userData);
          }

          hasNavigatedRef.current = true;
          setTimeout(() => {
            navigation.replace('Home');
          }, 2000);
        } catch (error) {
          console.error('Error signing in anonymously:', error);
        }
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
};

export default Splash;
