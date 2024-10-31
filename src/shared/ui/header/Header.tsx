import React from 'react';
import { StyleProp, Text, View, ViewProps, ViewStyle } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends ViewProps {
  children: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
function Header({
  children,
  before,
  after,
  style
}: Props) {
  return (
    <View style={[style, styles.wrapper]}>
      <View style={[styles.sideContainer, !before && styles.invisible]}>
        {before}
      </View>
      {typeof children === 'string' ? (
        <Text style={[globalStyles.text500, styles.text]}>{children}</Text>
      ) : (
        <View style={{}}>  
        {children}
        </View>
      )}
      <View style={[styles.sideContainer, !after && styles.invisible]}>
        {after}
      </View>
    </View>
  );
}

export default Header;
