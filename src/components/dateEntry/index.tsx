import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {IDateEntry} from './interface';
import getStyling from './style';
import Fontisto from 'react-native-vector-icons/Fontisto';

const dateEntry: FC<IDateEntry> = props => {
  const {title, containerStyle, date} = props;
  const styles = getStyling(containerStyle);
  return (
    <View style={styles.Container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity {...props}>
          <Fontisto name="date" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default dateEntry;
