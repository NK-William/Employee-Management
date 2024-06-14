import {StyleSheet} from 'react-native';
import {accent, primary, textColor} from '../../constants/colors';

const getStyling = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: primary,
      flex: 1,
      padding: 14,
    },
    headerContainer: {},
    largeText: {
      fontSize: 24,
      fontWeight: '600',
      color: textColor,
    },
    smallText: {
      color: textColor,
    },
    filterSearchContainer: {
      flexDirection: 'row',
      marginVertical: 14,
    },
    searchContainer: {
      height: 40,
      paddingHorizontal: 6,
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      justifyContent: 'center',
    },
    searchText: {
      color: textColor,
    },
    filterIconTextContainer: {
      flexDirection: 'row',
    },
    filterContainer: {
      justifyContent: 'center',
      marginLeft: 12,
    },
    filterText: {
      color: textColor,
      fontSize: 16,
    },
  });
};

export default getStyling;
