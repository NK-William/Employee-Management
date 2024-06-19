import {StyleProp, ViewStyle} from 'react-native';

export interface IDropDownEntry {
  title: string;
  value?: string;
  hideTitle?: boolean;
  options: string[];
  onOptionSelect?: (option: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}
