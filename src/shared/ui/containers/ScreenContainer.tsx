import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ScreenContainer = ({ children, style }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          {
            paddingBottom: 15,
            paddingTop: insets.top + 10,
            paddingHorizontal: 15,
            backgroundColor: 'white',
            flex: 1,
          },
          style,
        ]}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScreenContainer;
