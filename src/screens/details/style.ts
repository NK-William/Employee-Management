import {Platform, StyleSheet} from 'react-native';
import {accent, gray, primary, textColor} from '../../constants/colors';

const getStyling = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: primary,
      flex: 1,
      padding: 14,
    },
    titleText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: textColor,
    },
    subTitleText: {
      fontWeight: 'bold',
      color: accent,
      marginTop: 16,
    },
    entry: {
      marginTop: 10,
    },
    addSkillButton: {
      backgroundColor: gray,
      borderRadius: 8,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    addSkillButtonText: {
      color: textColor,
      fontWeight: 'bold',
    },
    skillTrashIcon: {
      marginLeft: 10,
    },
    submitButton: {
      backgroundColor: accent,
      position: 'relative',
      borderRadius: 24,
      paddingHorizontal: 10,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 30,
    },
    submitButtonIcon: {
      position: 'absolute',
      left: 10,
    },
    submitButtonText: {
      color: textColor,
      fontWeight: 'bold',
    },
  });
};

export default getStyling;
