import {View, Text, TextInput} from 'react-native';
import React, {FC} from 'react';
import {ITextEntry} from './interface';
import getStyling from './style';

const TextEntry: FC<ITextEntry> = props => {
  const {title, containerStyle, hideTitle} = props;
  const styles = getStyling(containerStyle);
  return (
    <View style={styles.Container}>
      {hideTitle ? null : <Text style={styles.title}>{title}</Text>}
      <View style={styles.entryContainer}>
        <TextInput {...props} style={styles.entry} />
      </View>
    </View>
  );
};

export default TextEntry;
