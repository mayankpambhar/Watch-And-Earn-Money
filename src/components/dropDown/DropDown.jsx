import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDropDownStyle} from './dropDownStyle';
const DropDown = ({
  label,
  open,
  item,
  value,
  setOpen,
  setValue,
  isRequired,
  placeholder,
  errorText,
  errorStyle,
  containerStyle,
  customSchema,
  onSelectItem,
  zIndex,
  listMode,
  onOpenDropdown,
  ...props
}) => {
  const styles = useDropDownStyle();

  return (
    <View style={[containerStyle, {zIndex: zIndex}]}>
      <View style={styles.dropDown}>
        <DropDownPicker
          open={open}
          items={item}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={onSelectItem}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          style={styles.dropDownContainer}
          arrowIconStyle={styles.arrowIcon}
          tickIconStyle={styles.arrowIcon}
          textStyle={[styles.dropDownText]}
          listMode={'SCROLLVIEW'}
          scrollViewProps={{nestedScrollEnabled: true}}
          onOpen={onOpenDropdown}
          {...props}
        />
      </View>
    </View>
  );
};

export default DropDown;
