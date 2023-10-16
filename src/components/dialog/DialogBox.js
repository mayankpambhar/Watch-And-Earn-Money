import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import {useDialogBoxStyle} from './DialogBoxStyle';

const DialogBox = ({modalVisible, onClose, msg, onPress}) => {
  const styles = useDialogBoxStyle();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.textStyle}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DialogBox;
