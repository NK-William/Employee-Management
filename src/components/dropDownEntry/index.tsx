import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {IDropDownEntry} from './interface';
import getStyling from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DropDownEntry: FC<IDropDownEntry> = props => {
  const {title, containerStyle, value, hideTitle, options, onOptionSelect} =
    props;
  const [showOptions, setShowOptions] = React.useState(false);

  const styles = getStyling(containerStyle);
  return (
    <View style={styles.Container}>
      {hideTitle ? null : <Text style={styles.title}>{title}</Text>}
      <View style={styles.dropDownContainer}>
        <Text style={styles.value}>{value}</Text>
        {showOptions ? (
          <TouchableOpacity onPress={() => setShowOptions(false)}>
            <Ionicons name="close-outline" size={23} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowOptions(true)}>
            <AntDesign size={19} color="#fff" name="down" />
          </TouchableOpacity>
        )}
      </View>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((value, index) => (
            <TouchableOpacity
              onPress={() => {
                if (onOptionSelect) {
                  onOptionSelect(value);
                }
              }}>
              <Text style={styles.optionText} key={index}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropDownEntry;
