import { StyleSheet, Text, View } from "react-native";
import RadioButton from "../radio-button/RadioButton";
import styles from "./styles";
import globalStyles from "@shared/constants/globalStyles";

interface AddServ {
  title: string;
  price: string | number;
  checked: boolean;
  onPress?: () => void;
  disabled: boolean;
}

export default function AddService({ title, price, onPress, checked, disabled }: AddServ) {
  return (
    <View style={[styles.container, disabled ? {opacity: 0.5} : {opacity: 1}]}>
      <View>
        <Text style={[globalStyles.text500, {fontSize: 16}]}>{title}</Text>
        <Text style={[globalStyles.text500, {fontSize: 16}]}>{price} ₽</Text>
      </View>
      <RadioButton checked={checked} onPress={disabled ? undefined : onPress} />
    </View>
  );
}

