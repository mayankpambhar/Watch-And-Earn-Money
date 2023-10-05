import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useTextInputStyle} from './textInputStyle';

const TextInputField = ({
  placeholder,
  isShow,
  keyboardType,
  maxLength,
  onChangeText,
  value,
  onPressIn,
  error,
}) => {
  const Styles = useTextInputStyle();
  return (
    <View style={Styles.MainView}>
      <View style={Styles.mainFieldStyle}>
        {isShow ? <Text style={Styles.code}>+91</Text> : null}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          style={Styles.countryCodeView}
          placeholderTextColor="#A0A2B3"
          keyboardType={keyboardType ?? 'default'}
          maxLength={maxLength && maxLength}
          onPressIn={onPressIn}
        />
      </View>
      {error && <Text style={Styles.error}>{error}</Text>}
    </View>
  );
};

export default TextInputField;
