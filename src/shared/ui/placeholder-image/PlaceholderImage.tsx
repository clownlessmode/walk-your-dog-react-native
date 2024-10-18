import { Image, ImageProps, View } from 'react-native';
import styles from './styles';
interface Props extends ImageProps {
  variant: 'pet' | 'user';
}
const PlaceholderImage = ({ variant = 'user', ...props }: Props) => {
  return (
    <View>
      <Image
        style={[styles.img, props.style]}
        source={
          variant === 'user'
            ? require('@assets/signUp/avatarUser.png')
            : require('@assets/signUp/avatarPet.png')
        }
      />
    </View>
  );
};

export default PlaceholderImage;
