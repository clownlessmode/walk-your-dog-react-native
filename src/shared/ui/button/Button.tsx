import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'dark' | 'light';
  icon?: React.ReactNode;
}
const Button = ({
  children,
  isLoading = false,
  variant = 'dark',
  icon,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[variant === 'dark' ? styles.buttonDark : styles.buttonLight]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'dark' ? 'white' : '#262626'}
        />
      ) : (
        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
        <Text style={[variant === 'dark' ? styles.textDark : styles.textLight, globalStyles.text500]}>
          {children}
        </Text>
       
        {icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
