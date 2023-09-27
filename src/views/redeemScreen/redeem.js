import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useRedeemStyle} from './redeemStyle';
// import {useHomeStyle} from '../homeScreen/homeStyle';

const RedeemPage = ({navigation}) => {
  const styles = useRedeemStyle();

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.mainBoxView}>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'Comming Soon', // Your message here
                ToastAndroid.SHORT, // Toast duration (SHORT or LONG)
                ToastAndroid.CENTER, // Toast gravity (TOP, BOTTOM, CENTER)
              );
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_amazon.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Amazon Gift\nCard'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'Comming Soon', // Your message here
                ToastAndroid.SHORT, // Toast duration (SHORT or LONG)
                ToastAndroid.CENTER, // Toast gravity (TOP, BOTTOM, CENTER)
              );
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_Flipkart.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Flipkart Gift\nCard'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GetOneGb');
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_1gb.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Get 1GB\nData'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GetTwoGb');
            }}>
            <View style={styles.boxView}>
              <Image
                style={styles.boxImage}
                source={require('../../assets/Images/ic_2gb.png')}
                resizeMode="contain"
              />
              <Text style={styles.boxText}>{'Get 2GB\nData'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RedeemPage;
