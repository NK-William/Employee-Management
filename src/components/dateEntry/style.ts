import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {accent, gray, primary, textColor} from '../../constants/colors';
import {flatten} from '../../utils';

const getStyling = (containerStyle: StyleProp<ViewStyle>) => {
  return StyleSheet.create({
    Container: flatten([{}, containerStyle]),
    dateContainer: {
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
    date: {
      color: textColor,
    },
    icon: {},
  });
};

export default getStyling;
