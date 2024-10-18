import {
  Keyboard,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
interface Props {
  children: React.ReactNode;
  header: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ScrollContainer = ({ children, style, header }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={[{ backgroundColor: 'white', paddingTop: insets.top, paddingHorizontal: 15 }]}>{header}</View>
        <KeyboardAwareScrollView
          style={[
            {
              paddingHorizontal: 15,
              backgroundColor: 'white',
              flex: 1,
            },
            style,
          ]}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={false}
          extraScrollHeight={100}
        >
          <View style={{justifyContent: "space-between", flex: 1}}>
          {children}
          </View>
        </KeyboardAwareScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ScrollContainer;
