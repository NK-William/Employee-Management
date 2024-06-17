import {KeyboardTypeOptions, StyleProp, ViewStyle} from 'react-native';

export interface ITextEntry {
  title: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  hideTitle?: boolean;
  onChangeText?: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}
