import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useGetGbStyle} from './getGBStyle';
import TextInputField from '../../components/textInput/textInput';
import DropDown from '../../components/dropDown/DropDown';
import {cardDetails} from '../../constants/cardConstant';
import {stateDetails} from '../../constants/stateConstant';
import {replaceSpecialAndAlphabet} from '../../helpers/stringUtils';
import {useNavigation, useRoute} from '@react-navigation/native';

const GetGb = () => {
  const {
    params: {data},
  } = useRoute();
  const navigation = useNavigation();
  const [openCard, setOpenCard] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [cardValue, setCardValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [number, setNumber] = useState('');
  const [inputError, setInputError] = useState('');
  const [stateError, setStateError] = useState('');
  const [cardError, setCardError] = useState('');
  const styles = useGetGbStyle();

  useEffect(() => {
    cardValue && setCardError('');
    stateValue && setStateError('');
  }, [cardValue, stateValue]);

  const onSubmitPress = () => {
    Keyboard.dismiss();
    setOpenCard(false);
    setOpenState(false);
    if (number.length !== 10) {
      setInputError('Enter valid number');
    }
    if (!stateValue) {
      setStateError('Enter state');
    }
    if (!cardValue) {
      setCardError('Enter card detail');
    }
    if (stateValue.length && cardValue.length && number.length === 10) {
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setOpenCard(false);
          setOpenState(false);
        }}>
        <View style={styles.mainView}>
          <View style={styles.rupeeRow}>
            <Text style={styles.coin}>5000</Text>
            <Text style={styles.rupee}>₹</Text>
          </View>
          <View style={styles.boxView}>
            <Image
              style={styles.boxImage}
              source={
                data === 1
                  ? require('../../assets/Images/ic_1gb.png')
                  : require('../../assets/Images/ic_2gb.png')
              }
              resizeMode="contain"
            />
          </View>
          <View style={styles.topView}>
            <TextInputField
              isShow={true}
              value={number}
              placeholder={'Enter Number'}
              keyboardType={'numeric'}
              maxLength={10}
              error={inputError}
              onChangeText={e => {
                const change = replaceSpecialAndAlphabet(e);
                setNumber(change);
                if (change.length === 10) {
                  setInputError('');
                }
              }}
              onPressIn={() => {
                setOpenCard(false);
                setOpenState(false);
              }}
            />
            <DropDown
              open={openState}
              items={stateDetails}
              value={stateValue}
              setOpen={setOpenState}
              setValue={setStateValue}
              placeholder={'Select State'}
              containerStyle={styles.dropDownContainer}
              onOpenDropdown={() => {
                setOpenCard(false);
                Keyboard.dismiss();
              }}
            />
            {stateError && <Text style={styles.error}>{stateError}</Text>}
            <DropDown
              open={openCard}
              items={cardDetails}
              value={cardValue}
              setOpen={setOpenCard}
              setValue={setCardValue}
              placeholder={'Select Card'}
              containerStyle={styles.dropDownContainer}
              zIndex={-1}
              onOpenDropdown={() => {
                setOpenState(false);
                Keyboard.dismiss();
              }}
            />
            {cardError && <Text style={styles.error}>{cardError}</Text>}
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                onSubmitPress();
                // Keyboard.dismiss();
                // setOpenCard(false);
                // setOpenState(false);
                // console.log('number.length: ', number.length);
                // if (number.length !== 10) {
                //   setError('Enter valid number');
                // }
                // if (
                //   stateValue.length &&
                //   cardValue.length &&
                //   number.length === 10
                // ) {
                //   navigation.navigate('Home');
                // }
              }}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default GetGb;
