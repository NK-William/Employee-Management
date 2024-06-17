import {StyleProp, ViewStyle} from 'react-native';

export interface IDateEntry {
  title: string;
  date?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
