import { Image, View } from "react-native";
import styles from "./styles";

const Logotype = () => {
  return (
    <View style={styles.shadowImage}>
      <Image
        style={styles.image}
        source={require("@assets/brending/logotype.png")}
      />
    </View>
  );
}
export default Logotype;
