import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props {
  title: string;
  description: string | undefined;
  link?: () => void
}
function DetailsItem({ title, description, link }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={link}>
      <View style={styles.info}>
        <Text style={[globalStyles.text400, { opacity: 0.5 }]}>{title}</Text>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>{description}</Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="chevron-right"
          color={'#545454'}
          size={16}
        />
      </View>
    </TouchableOpacity>
  );
}

export default DetailsItem;
