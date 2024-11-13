import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Button from '../button/Button';
import globalStyles from '@shared/constants/globalStyles';
import styles from './styles';
interface Props extends TouchableOpacityProps{
  title: string;
  description: string;
  buttonDescription: string;
  variant?: 'light' | 'dark',
}
function BlockInfoUser({ title, variant = 'light', description, buttonDescription, ...props }: Props) {
    let back = variant === 'light' ? styles.lightButton : styles.darkButton
    const textColor = variant === 'light' ? globalStyles.text500 : { ...globalStyles.text500, color: 'white' };
  return (
    <View
      style={styles.wrapper}
    >
      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text style={[globalStyles.text500, { fontSize: 20 }]}>{title}</Text>
        <Text style={[globalStyles.text500, {textAlign: 'center', fontSize: 12, opacity: 0.5 }]}>
          {description}
        </Text>
      </View>
      <TouchableOpacity style={[back]} {...props} >
    <Text style={[textColor, {fontSize: 13}]}>{buttonDescription}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BlockInfoUser;
