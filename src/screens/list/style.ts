import {Platform, StyleSheet} from 'react-native';
import {accent, gray, primary, textColor} from '../../constants/colors';

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
    entry: {
      color: textColor,
    },
    filterIconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedFilterText: {
      color: textColor,
    },
    filterContainer: {
      justifyContent: 'center',
      marginLeft: 12,
      width: 120,
    },
    filterText: {
      color: textColor,
      fontSize: 16,
    },
    listContainer: {
      position: 'relative',
      flex: 1,
      marginTop: 8,
    },
    listItemContainer: {
      backgroundColor: gray,
      marginTop: 8,
      height: 55,
      paddingHorizontal: 10,
      alignItems: 'center',
      borderRadius: 8,
      flexDirection: 'row',
    },
    listItemNumberContainer: {},
    listItemNumberCircle: {
      width: 30,
      height: 30,
      borderColor: accent,
      borderRadius: 15,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItemNumber: {
      color: accent,
    },
    listItemDetailsContainer: {
      flex: 1,
      marginLeft: 10,
    },
    listItemDetailsNameText: {
      color: textColor,
      fontSize: 16,
    },
    listItemDetailsNumberText: {
      color: textColor,
      marginTop: 3,
    },
    filterIcon: {
      width: 25,
      alignItems: 'flex-end',
    },
    filterPopUp: {
      position: 'absolute',
      width: 200,
      backgroundColor: primary,
      minHeight: 100,
      top: -10,
      borderWidth: 1,
      borderColor: gray,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
      }),
      right: 0,
      borderRadius: 8,
      padding: 10,
      paddingBottom: 5,
    },
    filterOptionText: {color: textColor, paddingBottom: 5},
    addButton: {
      backgroundColor: accent,
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 6,
      right: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    emptyListContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      height: 250,
    },
    emptyText1: {
      color: textColor,
      fontSize: 18,
      marginTop: 20,
    },
    emptyText2: {
      textAlign: 'center',
      color: textColor,
      fontSize: 16,
      marginTop: 25,
    },
    emptyTextPlus: {
      color: textColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
};

export default getStyling;
