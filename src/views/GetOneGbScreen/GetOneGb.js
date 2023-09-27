import {View, TextInput} from 'react-native';
import React from 'react';
import {useOneGbStyle} from './GetOneGbStyle';

const GetOneGb = () => {
  const styles = useOneGbStyle();
  return (
    <View style={styles.mainView}>
      <TextInput
        placeholder="Enter Country Code"
        style={styles.countryCodeView}
      />
    </View>
  );
};

export default GetOneGb;
