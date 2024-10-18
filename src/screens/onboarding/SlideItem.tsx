import { Image, StyleSheet, Text, View } from "react-native";
import { Slide } from "./slides";
interface SlideItemProps {
  item: Slide;
}
const SlideItem = ({ item }: SlideItemProps) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
    </View>
  );
};
const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
export default SlideItem