import React from 'react';
import styles from './styles';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import globalStyles from '@shared/constants/globalStyles';

interface Props extends TouchableOpacityProps{
  variant: 'reminder' | 'service';
  title: string;
  description: string;
}

function ImageRecord({ variant = 'reminder', title, description, ...props }: Props) {
  const img =
    variant === 'reminder'
      ? require('@assets/modalRecord/reminder.png')
      : require('@assets/modalRecord/service.png');
  return (
    <TouchableOpacity {...props}>
      <Image source={img} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={[globalStyles.text500, styles.textTitle]}>{title}</Text>
        <Text style={[globalStyles.text400, styles.textDescription]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ImageRecord;
