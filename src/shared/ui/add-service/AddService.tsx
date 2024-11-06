import { StyleSheet, Text, View } from "react-native";
import RadioButton from "../radio-button/RadioButton";
import styles from "./styles";
import globalStyles from "@shared/constants/globalStyles";

interface AddServ {
  title: string;
  price: string | number;
  checked: boolean;
  onPress?: () => void;
}

export default function AddService({ title, price, onPress, checked }: AddServ) {
    // const [checked, setChecked] = useState(false);

    // const handlePress = () => {
    //     setChecked(!checked);
    //   };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[globalStyles.text500, {fontSize: 16}]}>{title}</Text>
        <Text style={[globalStyles.text500, {fontSize: 16}]}>{price} ₽</Text>
      </View>
      <RadioButton checked={checked} onPress={onPress} />
    </View>
  );
}

