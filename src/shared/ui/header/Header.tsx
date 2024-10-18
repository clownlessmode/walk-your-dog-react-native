import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends ViewProps {
  children: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
}
function Header({
  children,
  before = <View></View>,
  after = <View></View>,
}: Props) {
  return (
    <View style={[styles.wrapper, { justifyContent: 'space-between' }]}>
      <View style={[styles.sideContainer, !before && styles.invisible]}>
        {before}
      </View>
      <Text style={[globalStyles.text500, styles.text]}>{children}</Text>
      <View style={[styles.sideContainer, !after && styles.invisible]}>
        {after}
      </View>
    </View>
  );
}

export default Header;
