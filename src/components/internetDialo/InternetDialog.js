import {View, Text, Modal, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useInternetDialogStyle} from './InternetDialogStyle';

const InternetDialog = ({modalVisible, onClose, msg, description}) => {
  const styles = useInternetDialogStyle();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.nointernetImageView}>
            <Image
              style={styles.noinernetImage}
              source={require('../../assets/Images/ic_nointernet.png')}
            />
          </View>
          <Text style={styles.modalText}>{msg}</Text>
          <Text style={styles.modalDescText}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default InternetDialog;
