import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {accent, gray, primary, textColor} from '../../constants/colors';
import {flatten} from '../../utils';

const getStyling = (containerStyle: StyleProp<ViewStyle>) => {
  return StyleSheet.create({
    Container: flatten([{}, containerStyle]),
    entryContainer: {
      backgroundColor: gray,
      borderRadius: 8,
      height: 40,
      paddingHorizontal: 8,
      justifyContent: 'center',
    },
    title: {
      color: textColor,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    entry: {
      color: textColor,
    },
  });
};

export default getStyling;
