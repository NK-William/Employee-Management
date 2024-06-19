import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {gray, primary, textColor} from '../../constants/colors';
import {flatten} from '../../utils';

const getStyling = (containerStyle: StyleProp<ViewStyle>) => {
  return StyleSheet.create({
    Container: flatten([{}, containerStyle]),
    dropDownContainer: {
      backgroundColor: gray,
      borderRadius: 8,
      height: 40,
      paddingHorizontal: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: textColor,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    value: {
      color: textColor,
    },
    optionsContainer: {
      borderWidth: 0,
      borderColor: 'white',
      backgroundColor: gray,
      borderRadius: 8,
      marginTop: -12,
      minHeight: 40,
      paddingHorizontal: 8,
      paddingTop: 4,
      width: '100%',
    },
    optionText: {
      color: textColor,
      paddingBottom: 4,
    },
  });
};

export default getStyling;
